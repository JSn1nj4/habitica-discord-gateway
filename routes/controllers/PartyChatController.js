const { Sentry } = require('../../config')
const messageSchemas = require('../../validators/party/chat/messages')
const https = require('https')

class PartyChatController {
  constructor() {

  }

  index(req, res) {
    res.sendStatus(204)
  }

  sendMessageHandler(req, res) {
    this.checkMessage(req);
    res.sendStatus(204)
  }

  async checkMessage(req) {
    console.log(JSON.stringify(req.body))
    messageSchemas.body.validate(req.body)
      .then(this.sendMessage.bind(this))
      .catch(this.logError.bind(this))
  }

  sendMessage(data) {
    // console.log('Validated body object: ')
    // console.log(JSON.stringify(data))

    let msg = {
      content: "New Party Notification :bell:",
      embeds: [
        {
          title: data.group.name,
          description: data.chat.text,
          url: "https://habitica.com/party",
          color: 4401268,
          timestamp: data.chat.timestamp
        }
      ],
    }

    if(data.chat.username) {
      msg.embeds[0].author = { name: data.chat.username }
      msg.content = "New Chat Message :speech_balloon:"
    }

    if(data.chat.info && data.chat.info !== {}) {
      msg.content = this.buildMainMessageContent(data.chat.info, msg.content);
    }

    let json = JSON.stringify(msg)

    // either wrap this in its own class or replace with Axios
    const options = {
      hostname: 'discordapp.com',
      port: 443,
      path: `/api/webhooks/${process.env.PARTY_CHAT_WEBHOOK_ID}/${process.env.PARTY_CHAT_WEBHOOK_TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': json.length,
      }
    }

    const req = https.request(options, (res) => {
      console.log(`statusCode ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', this.logError.bind(this))

    req.write(json)
    req.end()
  }

  logError(error) {
    Sentry.captureException(error)
  }

  buildMainMessageContent(info, defaultMsg) {
    const types = {
      all_items_found: "All items found! :moneybag:",
      boss_damage: this.buildBossDamageMessage, // method used to get `boss_damage` message
      boss_defeated: "Boss defeated! :trophy:",
      quest_start: "Your quest has started! :scroll:",
      spell_cast_party: "Party Buffed :muscle:",
      spell_cast_user: "Party Member Pranked :laughing:",
      user_found_items: "Items collected! :gem:",
    }

    let msg = types[info.type]
    if( msg && msg.call ) msg = msg.call(this, info)

    return msg || defaultMsg
  }

  buildBossDamageMessage(info) {
    return (
      parseFloat(info.userDamage) <= 0 ? "Oh no, look out! :scream_cat:"
      : (parseFloat(info.bossDamage) >= 10 ? "Boss dealt a heavy blow! :dizzy_face:"
      : (parseFloat(info.userDamage) >= 40 ? `${info.user} dealt a heavy blow! :boom:`
      : `${info.user} attacked Boss :crossed_swords:`))
    )
  }
}

module.exports = PartyChatController

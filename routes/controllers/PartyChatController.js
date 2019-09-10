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
    console.log(req.body)
    messageSchemas.body.validate(req.body)
      .then(this.sendMessage.bind(this))
      .catch(this.logError.bind(this))
  }

  sendMessage(data) {
    // console.log('Validated body object: ')
    // console.log(data)

    let msg = {
      content: "**New Party Notification** :bell:",
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
      msg.content = "**New Chat Message** :speech_balloon:"
    }

    msg.content = this.buildMainMessageContent(data, msg.content);

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

  buildMainMessageContent(data, defaultMsg) {
    // Use the default message if the `data.chat.info` object doesn't exist
    if(!data.chat.info || data.chat.info === {}) {
      return defaultMsg
    }

    // partially destructure `data.chat` object
    let { info } = data.chat

    // Some notification types will only need 1 message option
    if(info.type === 'spell_cast_party') return "**Party Buffed** :muscle:"
    if(info.type === 'spell_cast_user') return "**Party Member Pranked** :laughing:"

    // Message options for boss_damage notifications
    if(info.type === 'boss_damage') {
      if(parseFloat(info.userDamage) <= 0) return "Oh no, **look out!** :scream_cat:"
      if(parseFloat(info.bossDamage) >= 10) return "Boss dealt a heavy blow! :dizzy_face:"
      if(parseFloat(info.userDamage) >= 40) return `${info.user} dealt a heavy blow! :boom:`

      // default message for `boss_damage` chat type
      return `${info.user} attacked Boss :crossed_swords:`
    }

    // Return the default message if no suitable alternative is found
    return defaultMsg
  }
}

module.exports = PartyChatController

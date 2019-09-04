const { Sentry } = require('../../config')
const messageSchemas = require('../../validators/party/chat/messages')
const https = require('https')

class PartyChatController {
  constructor() {

  }

  index(req, res) {
    res.sendStatus(200)
  }

  sendMessageHandler(req, res) {
    this.checkMessage(req);
    res.sendStatus(200)
  }

  async checkMessage(req) {
    // console.log(req.body)
    messageSchemas.body.validate(req.body)
      .then(this.sendMessage.bind(this))
      .catch(this.logError.bind(this))
  }

  sendMessage(data) {
    console.log('Validated body object: ')
    console.log(data)

    let msg = {
      content: "New party message!",
      embeds: [
        {
          title: `${data.group.name} party chat`,
          description: data.chat.text,
          url: "https://habitica.com/party",
          color: 4401268,
          timestamp: data.chat.timestamp
        }
      ]
    }

    if(data.chat.username) {
      msg.embeds[0].author = { name: data.chat.username }
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
}

module.exports = PartyChatController

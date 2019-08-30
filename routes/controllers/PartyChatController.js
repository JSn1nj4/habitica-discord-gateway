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
      .then(this.sendMessage)
      .catch(this.logError)
  }

  sendMessage(data) {
    console.log('Validated body object: ')
    console.log(data)

    let msg = JSON.stringify({
      content: "New party message!",
      embeds: [
        {
          author: {
            name: data.chat.username || data.chat.uuid
          },
          title: `${data.group.name} party chat`,
          text: data.chat.text,
          url: "https://habitica.com/party",
          color: 4401268,
          timestamp: data.chat.timestamp
        }
      ]
    })

    // either wrap this in its own class or replace with Axios
    const options = {
      hostname: 'discordapp.com',
      port: 443,
      path: `/api/webhooks/${process.env.PARTY_CHAT_WEBHOOK_ID}/${process.env.PARTY_CHAT_WEBHOOK_TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': msg.length,
      }
    }

    const req = https.request(options, (res) => {
      console.log(`statusCode ${res.statusCode}`)

      res.on('data', (d) => {
        process.stdout.write(d)
      })
    })

    req.on('error', (error) => {
      this.logError(error)
    })

    req.write(msg)
    req.end()
  }

  logError(error) {
    Sentry.captureException(error)
  }
}

module.exports = PartyChatController

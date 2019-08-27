const { Sentry } = require('../../config')
const messageSchemas = require('../../validators/party/chat/messages')

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
  }

  logError(error) {
    console.log(error)
    Sentry.captureMessage('Data validation error')
  }
}

module.exports = PartyChatController

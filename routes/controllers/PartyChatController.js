// Controller
class PartyChatController {
  constructor() {

  }

  index(req, res) {
    // res.sendStatus(200)
    throw new Error('My first sentry error!')
  }

  sendMessageHandler(req, res) {
    this.sendMessage(req);
    res.sendStatus(200)
  }

  async sendMessage(req) {
    console.log(req.body)
  }
}

module.exports = PartyChatController

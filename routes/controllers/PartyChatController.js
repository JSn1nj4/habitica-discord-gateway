// Controller
class PartyChatController {
  constructor() {

  }

  index(req, res) {
    res.sendStatus(200)
  }

  sendMessage(req, res) {
    this.sendMessageHandler(req);
    res.sendStatus(200)
  }

  async sendMessageHandler(req) {
    console.log(req)
  }
}

module.exports = PartyChatController

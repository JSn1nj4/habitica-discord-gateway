// Controller
class PartyChatController {
  constructor() {

  }

  index(req, res) {
    res.sendStatus(200)
  }

  sendMessageHandler(req, res) {
    this.sendMessage(req);
    res.sendStatus(200)
  }

  async sendMessage(req) {
    console.log(req)
  }
}

module.exports = PartyChatController

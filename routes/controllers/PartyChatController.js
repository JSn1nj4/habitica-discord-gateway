const messageSchemas = require('../../validators/party/chat/messages');

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
    // console.log(req.body)
    let validatedBody = messageSchemas.body.validate(req.body);

    console.log('Validated body object: ');
    console.log(validatedBody);
  }
}

module.exports = PartyChatController

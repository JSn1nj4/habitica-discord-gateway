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
    console.log('Request body pieces:');
    let chat = req.body.chat;

    if(chat.info && chat.info !== {}) {
      console.log('chat.info:');
      console.log(chat.info);
    }

    if(chat.likes && chat.likes !== {}) {
      console.log('chat.likes:');
      console.log(chat.likes);
    }

    if(chat.contributor && chat.contributor !== {}) {
      console.log('chat.contributor:');
      console.log(chat.contributor);
    }

    if(chat.backer && chat.backer !== {}) {
      console.log('chat.backer:');
      console.log(chat.backer);
    }

    if(chat.userStyles && chat.userStyles !== {}) {
      console.log('chat.userStyles:');
      console.log(chat.userStyles);
    }
  }
}

module.exports = PartyChatController

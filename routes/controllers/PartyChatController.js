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
    let body = req.body;

    if(body.info && body.info !== {}) {
      console.log('body.info:');
      console.log(body.info);
    }

    if(body.likes && body.likes !== {}) {
      console.log('body.likes:');
      console.log(body.likes);
    }

    if(body.contributor && body.contributor !== {}) {
      console.log('body.contributor:');
      console.log(body.contributor);
    }

    if(body.backer && body.backer !== {}) {
      console.log('body.backer:');
      console.log(body.backer);
    }

    if(body.userStyles && body.userStyles !== {}) {
      console.log('body.userStyles:');
      console.log(body.userStyles);
    }
  }
}

module.exports = PartyChatController

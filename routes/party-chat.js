const partyRouter = require('express').Router()
const PartyChatController = require('./controllers/PartyChatController')

const partyChat = new PartyChatController()

// router
partyRouter.get('/', (req, res) => partyChat.index(req, res))
partyRouter.post('/send-message', (req, res) => partyChat.sendMessageHandler(req, res))

module.exports = partyRouter

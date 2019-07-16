const router = require('express').Router()
const partyRouter = require('./party-chat')

router.use('/party/chat', partyRouter)

module.exports = router

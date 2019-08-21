const router = require('express').Router()
const partyRouter = require('./party-chat')

router.use('/party/chat', partyRouter)

router.get('*', (req, res) => res.sendStatus(200));

module.exports = router

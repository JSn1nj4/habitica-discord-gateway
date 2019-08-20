const router = require('express').Router()
const partyRouter = require('./party-chat')

router.use('/party/chat', partyRouter)

router.get('/', (req, res) => res.json({status: 200, message: 'Hello world!'}));

module.exports = router

const router = require('express').Router()
const partyRouter = require('./party-chat')

router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.use('/party/chat', partyRouter)

module.exports = router

// import express from 'express'
let express = require('express')
const app = express()

require('./controllers/PartyChat')

app.listen(3000, () => {
  console.log("Server running on port 3000")
})

app.post('/party/chat/new-message', (req, res, next) => {
  
})
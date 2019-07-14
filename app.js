// import express from 'express'
let express = require('express')
const app = express()

app.listen(3000, () => {
  console.log("Server running on port 3000")
})

app.get('/party/chat/new-message', (req, res, next) => {
  res.json(['Elliot', 'Katie', 'Nadia'])
})
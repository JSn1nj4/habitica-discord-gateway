// import express from 'express'
const app = require('express')()
const { Sentry } = require("./config")
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = process.env.PORT || 3300;

app.use(Sentry.Handlers.requestHandler())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', routes)
app.use(Sentry.Handlers.errorHandler())

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

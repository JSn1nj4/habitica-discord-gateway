// import express from 'express'
const app = require('express')()
const Sentry = require("@sentry/node")
const routes = require('./routes')
const port = process.env.PORT || 80;

Sentry.init({ dsn: `https://${ process.env.SENTRY_KEY }@sentry.io/1537673` })

app.use(Sentry.Handlers.requestHandler())
app.use('/', routes);
app.use(Sentry.Handlers.errorHandler())

app.listen(port, () => {
  Sentry.captureMessage(`Server running on port ${port}`);
  console.log(`Server running on port ${port}`)
})

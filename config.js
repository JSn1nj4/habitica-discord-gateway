// Sentry Init

const Sentry = require("@sentry/node")

Sentry.init({ dsn: `https://${ process.env.SENTRY_KEY }@sentry.io/1537673` })

module.exports = {
  Sentry,
}

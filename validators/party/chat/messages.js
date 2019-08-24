const Joi = require('@hapi/joi')

const body = Joi.object().keys({
  group: Joi.object().keys({
    id: Joi.string().uuid(), // need UUID version
    name: Joi.string()
  }),
  chat: Joi.object().keys({
    flagCount: Joi.number().integer(),
    flags: Joi.object(), // needs better definition
    _id: Joi.string().uuid(), // need UUID version
    id: Joi.string().uuid(), // need UUID version
    // text: string
    // info: [Object] (needs testing)
    // timestamp
    // likes: object (needs looking into)
    // uuid (uuid or "system")
    // groupdid (group's UUID)
  }),
  // webhookType: groupChatReceived
  // user: object w/ _id
})

const schemas = {
  body
}

module.exports = schemas
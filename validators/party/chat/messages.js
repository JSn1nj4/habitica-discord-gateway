const Joi = require('@hapi/joi')

const uuidVersions = [
  'uuidv3',
  'uuidv4',
  'uuidv5',
]

const body = Joi.object({
  group: Joi.object({

    id: Joi.string().uuid({
      version: uuidVersions,
    }),
    name: Joi.string()

  }).required(),

  chat: Joi.object({

    flagCount: Joi.number().integer(),
    flags: Joi.object(), // needs definition

    _id: Joi.string().uuid({
      version: uuidVersions,
    }),
    id: Joi.string().uuid({
      version: uuidVersions,
    }),

    text: Joi.string(),
    info: Joi.object({
      type: Joi.string(),
      user: Joi.string(),
      class: Joi.string(),
      spell: Joi.string(),
      quest: Joi.string(),
      userDamage: Joi.string(),
      bossDamage: Joi.string(),
    }),

    timestamp: Joi.date().iso(),
    client: Joi.string().valid('android', 'ios', 'web'),

    uuid: Joi.alternatives().try(
      Joi.string().uuid({
        version: uuidVersions,
      }),
      Joi.string().valid('system'),
    ).required(),

    user: Joi.string(),
    username: Joi.string(),

    groupId: Joi.string().uuid({
      version: uuidVersions,
    }).required(),

  }).required(),

  webhookType: Joi.string().valid('groupChatReceived').required(),

  user: Joi.object().keys({
    _id: Joi.string().uuid({
      version: uuidVersions,
    }),
  }),
}).options({
  stripUnknown: { // remove any object keys not known by the schema
    objects: true,
  },
})

module.exports = {
  body,
}

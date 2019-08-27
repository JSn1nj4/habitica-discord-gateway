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
    info: Joi.object().strip(), // currently unnecessary
    timestamp: Joi.date().iso(),
    likes: Joi.object().strip(), // currently unnecessary
    client: Joi.string().valid('android', 'ios', 'web'), // need list of possible clients

    uuid: Joi.alternatives().try(
      Joi.string().uuid({
        version: uuidVersions,
      }),
      Joi.string().valid('system'),
    ).required(),

    contributor: Joi.object().strip(), // currently unnecessary
    backer: Joi.object().strip(), // currently unnecessary
    user: Joi.string(),
    username: Joi.string(),

    groupId: Joi.string().uuid({
      version: uuidVersions,
    }).required(),

    userStyles: Joi.object().strip(), // currently unnecessary

  }).required(),

  webhookType: Joi.string()
    .valid('groupChatReceived')
    .required(),

  user: Joi.object().keys({
    _id: Joi.string().uuid({
      version: uuidVersions,
    }),
  }),
}).options({
  stripUnknown: { // remove any object keys not known by the schema
    objects: true
  },
})

const messageSchemas = {
  body,
}

module.exports = messageSchemas

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
    info: Joi.object(), // needs definition
    timestamp: Joi.date().iso(),
    likes: Joi.object(), // needs definition
    client: Joi.string().valid('android', 'ios', 'web'), // need list of possible clients

    uuid: Joi.alternatives().try(
      Joi.string().uuid({
        version: uuidVersions,
      }),
      Joi.string().valid('system'),
    ).required(),

    contributor: Joi.object(), // needs definition
    backer: Joi.object(), // needs definition
    user: Joi.string(),
    username: Joi.string(),

    groupdid: Joi.string().uuid({
      version: uuidVersions,
    }).required(),

    userStyles: Joi.object(), //needs definition

  }).required(),

  webhookType: Joi.string()
    .valid('groupChatReceived')
    .required(),

  user: Joi.object().keys({
    _id: Joi.string().uuid({
      version: uuidVersions,
    }),
  }),
})

const schemas = {
  body,
}

module.exports = schemas

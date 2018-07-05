const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(404).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(404).send({
            error: `The Password provided failed to match the following rules:
            <br>
            1. It must contain ONLY the following characters: lower case, upper case, numerics.
            <br>
            2. It must be at least 8 characters in length and not greater than 32 character.
            `
          })
          break
        default:
          res.status(404).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}

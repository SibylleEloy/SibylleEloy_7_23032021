const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      firstname: Joi.string().alphanum().min(3).max(30).required(),
      lastname: Joi.string().alphanum().min(3).max(30).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      role: Joi.string().alphanum().min(3).max(30).required()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'Vous devez fournir une adresse email valide'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
              <br>
              1. It must contain ONLY the following characters: lower case, upper case, numerics.
              <br>
              2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
          })
          break
        default:
          res.status(400).send({
            error: 'Informations non valides'
          })
      }
    } else {
      next()
    }
  }
}

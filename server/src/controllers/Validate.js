const {roles} = require('../roles')

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource)
      if (!permission.granted) {
        return res.status(401).json({
          error: 'Permission refusée'
        })
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

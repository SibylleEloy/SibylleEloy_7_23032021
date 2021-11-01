const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles = (function () {
  ac.grant('Employe')
    .readAny('article')
    .updateOwn('article')

  ac.grant('Administrateur')
    .extend('Employe')
    .updateAny('article')
    .deleteAny('article')

  return ac
})()

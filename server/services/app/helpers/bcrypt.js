const bcrypt = require('bcryptjs')

function hashPass(pass) {
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(pass, salt)
}

function comparePass(pass, hashPass) {
    return bcrypt.compareSync(pass, hashPass)
}

module.exports = {
    hashPass,
    comparePass
}
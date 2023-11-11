const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(password, salt)
}

module.exports = hashPassword
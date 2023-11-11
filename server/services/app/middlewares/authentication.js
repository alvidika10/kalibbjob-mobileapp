const { verifyToken } = require("../helpers/jwt")
const {User} = require("../models/index")

async function authentication(req, res, next) {
    try {
        const {access_token} = req.headers
       
        if (!access_token) {
            throw {name: "unauthenticated"}
        }

        const payload = verifyToken(access_token)
        // console.log(payload)

        const findUser = await User.findByPk(payload.id)

        // console.log(findUser)
        if (!findUser) {
            throw {name: "unauthenticated"}
        }

        req.user = {
            id : findUser.id,
            email: findUser.email,
            role: findUser.role
        }

        next()

    } catch (err) {
       next(err)
    }
}

module.exports = authentication
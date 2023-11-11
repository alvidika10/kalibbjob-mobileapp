const {getDb} = require("../config/mongo")
const hashPassword = require("../helper/bcrypt")
const User = require("../models/user")

class Users {
    static async createUser(req, res, next) {
        try {
            const collection = getDb().collection('Users')
            let {username, email, password, role, phoneNumber, address} = req.body
            console.log(username, email, password, role, phoneNumber, address)
            if (!email) {
                throw {name: 'email_required'}
            }
            if (!password) {
                throw {name: 'pass_required'}
            }
            let findEmail = await collection.findOne({email})
            if (findEmail) {
                throw {name: 'must_unique'}
            }
            password = hashPassword(password)
            const user = await User.create({
                username, email, password, role, phoneNumber, address
            })
            return res.status(201).json(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async findAllUser(req, res, next) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.findByPk(id)
            if (!user) {
                throw {name: 'not_found'}
            }
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.delete(id)
            if (!user) {
                throw {name: 'not_found'}
            }
            res.status(200).json({message: `Delete success with id ${id}`})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Users
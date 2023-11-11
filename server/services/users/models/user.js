const { getDb } = require("../config/mongo")
const {ObjectId} = require('mongodb')

class User {

    static collection() {
        return getDb().collection('Users')
    }

    static async create(value) {
        try {
            const user = await this.collection().insertOne(value)
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async findAll() {
        try {
            const users = await this.collection().find({}, {projection: {password: 0}}).toArray()
            return users
        } catch (error) {
            console.log(error)
        }
    }

    static async findByPk(id) {
        try {
            const user = await this.collection().findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
            return user
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id) {
        try {
            const user = await this.collection().deleteOne({_id: new ObjectId(id)})
            return user
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = User
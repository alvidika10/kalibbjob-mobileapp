const axios = require('axios')
const USER_BASE_URL = 'http://localhost:4001/users/'
const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis-19291.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 19291,
    password: process.env.REDIS_PASSWORD,
})
class User {

    static async createUser(req, res, next) {
        try {
            let {username, email, password, role, phoneNumber, address} = req.body
            console.log(username, email, password, role, phoneNumber, address)
            const {data} = await axios({
                url: USER_BASE_URL,
                method: 'post',
                data: {
                    username, 
                    email, 
                    password, 
                    role, 
                    phoneNumber, 
                    address
                }
            })
            await redis.del('users-express')
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            let user = await redis.get('users-express')
            if (!user) {
                console.log('belum ada data')
                const {data} = await axios({
                    url: USER_BASE_URL, 
                    method: 'get'
                })
                user = data
                await redis.set('users-express', JSON.stringify(user))
            }
            else {
                user = JSON.parse(user)
                console.log('ada loh data')
            }
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getUserbyId(req, res, next) {
        try {
            const {id} = req.params
            let user = await redis.get(`users-express:${id}`)
            if (!user) {
                console.log('belum ada data id')
                const {data} = await axios({
                    url: USER_BASE_URL + id, 
                    method: 'get'
                })
                user = data
                await redis.set(`users-express:${id}`, JSON.stringify(user))
            }
            else {
                user = JSON.parse(user)
                console.log('ada data id')
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
            const {data} = await axios({
                url: USER_BASE_URL + id, 
                method: 'delete'
            })
            await redis.del('users-express')
            await redis.del(`users-express:${id}`)
            res.status(200).json({message: `Delete user with id ${id}`})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = User
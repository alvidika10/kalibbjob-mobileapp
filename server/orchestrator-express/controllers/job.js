const axios = require('axios')
const JOB_BASE_URL = 'http://localhost:4002/'
const USER_BASE_URL = 'http://localhost:4001/users/'
const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis-19291.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 19291,
    password: process.env.REDIS_PASSWORD,
})

class Job {

    static async getJob(req, res, next) {
        try {
            let jobs = await redis.get('jobs-express')
            if (!jobs) {
                console.log('belum ada data')
                const {data} = await axios({
                    url: JOB_BASE_URL + 'admin/jobs', 
                    method: 'get'
                })
                jobs = data
                await redis.set('jobs-express', JSON.stringify(jobs))
            }
            else {
                jobs = JSON.parse(jobs)
                console.log('ada data')
            }
            res.status(200).json(jobs)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
 
    static async getJobById(req, res, next) {
        try {
            const {id} = req.params
            console.log(id, '<<<')
            let jobs = await redis.get('jobs-express:'+ id)
            if (!jobs) {
                console.log('belum ada data id')
                let {data} = await axios({
                    url: JOB_BASE_URL + 'admin/jobs/' + id, 
                    method: 'get'
                })
                let response = await axios({
                    url: USER_BASE_URL + data.mongo_id, 
                    method: 'get'
                })
                data.User = response.data 
                jobs = data
                await redis.set('jobs-express:'+ id, JSON.stringify(jobs))
            }
            else {
                jobs = JSON.parse(jobs)
                console.log('ada data id')
            }
            res.status(200).json(jobs)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async createJob(req, res, next) {
        try {
            const {title, description, companyId, authorId, jobType, mongo_id, skills} = req.body
            console.log(title, description, companyId, authorId, jobType, mongo_id, skills)
            const {data} = await axios({
                url: JOB_BASE_URL + 'admin/jobs', 
                method: 'post',
                data: {
                    title, 
                    description, 
                    companyId, 
                    authorId, 
                    jobType, 
                    mongo_id,
                    skills
                }
            })
            await redis.del('jobs-express')
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async deleteJob(req, res, next) {
        try {
            const {id} = req.params
            const {data} = await axios({
                url: JOB_BASE_URL + 'admin/jobs/' + id, 
                method: 'delete'
            })
            await redis.del('jobs-express')
            await redis.del('jobs-express:'+ id)
            res.status(200).json({message: `Delete with id ${id} Success`})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async updateJob(req, res, next) {
        try {
            const {id} = req.params
            const {title, description, companyId, authorId, jobType, mongo_id} = req.body
            const {data} = await axios({
                url: JOB_BASE_URL + 'admin/jobs/' + id, 
                method: 'put',
                data: {
                    title, 
                    description, 
                    companyId, 
                    authorId, 
                    jobType, 
                    mongo_id
                }
            })
            await redis.del('jobs-express')
            await redis.del('jobs-express:'+ id)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = Job
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis-19291.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 19291,
    password: process.env.REDIS_PASSWORD,
})

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Company {
    id: Int,
    name: String,
    companyLogo: String,
    location: String,
    email: String,
    description: String,
    createdAt: String,
    updatedAt: String
  }

  type Skills {
    id: Int,
    jobId: Int,
    name: String,
    level: String,
    createdAt: String,
    updatedAt: String
  }

  type User {
    _id: String,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  type Job {
    id: Int,
    title: String,
    description: String,
    companyId: Int,
    authorId: Int,
    jobType: String,
    mongo_id: String,
    createdAt: String,
    updatedAt: String,
    Company: Company
    Skills: [Skills]
    User: User
  }

  input SkillInput {
    name: String,
    level: String
  }

  input JobInput {
    title: String,
    description: String,
    companyId: Int,
    authorId: Int,
    jobType: String,
    mongo_id: String,
    skills: [SkillInput]
  }

  type Message {
    msg: String
  }

  type Query {
    getJobs: [Job],
    getJob(id: Int!): Job
  }

  type Mutation {
    addJob(job: JobInput): Message,
    deleteJob(id:Int!): Message
    editJob(id:Int!, job: JobInput): Message
  }
`;

const JOB_BASE_URL = process.env.JOB_BASE_URL || 'http://service-app:4002/admin/jobs/'
const USER_BASE_URL = process.env.USER_BASE_URL || 'http://service-user:4001/users/'

const resolvers = {
    Query: {

        // get all job 
        getJobs: async () => {
            try {
                let jobs = await redis.get('jobs')
                if (!jobs) {
                    const { data } = await axios({
                        url: JOB_BASE_URL, 
                        method: 'get'
                    })
                    jobs = data
                    await redis.set('jobs', JSON.stringify(jobs))
                }
                else {
                    jobs = JSON.parse(jobs)
                }
                return jobs    
            } catch (error) {
                throw error
            }
        },

        // get job by id
        getJob: async (_, args) => {
            try {
                let jobs = await redis.get(`jobs:${args.id}`)
                if (!jobs) {
                    const { data } = await axios({
                        url: JOB_BASE_URL + args.id, 
                        method: 'get'
                    })    
                    const response = await axios({
                        url: USER_BASE_URL + data.mongo_id,
                        method: 'get'
                    })
                    data.User = response.data
                    jobs = data
                    await redis.set(`jobs:${args.id}`, JSON.stringify(jobs))
                }
                else {
                    jobs = JSON.parse(jobs)
                }
                return jobs   
            } catch (error) {
                throw error
            }
        }
    },

    Mutation: {
        // add new job
        addJob: async (_, args) => {
            try {
                const {title, description, companyId, authorId, jobType, mongo_id, skills} = args.job
                const { data } = await axios({
                    url: JOB_BASE_URL,
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
                await redis.del('jobs')
                await redis.del(`jobs:${args.id}`)
                return {msg: 'Add job has been success'}
            } catch (error) {
                throw error
            }
        },

         // delete job
         deleteJob: async (_, args) => {
            try {
                const id = args.id
                const { data } = await axios({
                    url: JOB_BASE_URL + id,
                    method: 'delete'
                })
                await redis.del('jobs')
                await redis.del(`jobs:${args.id}`)
                return {msg: "Success Delete job with id "+ id}
            } catch (error) {
                throw error
            }
        },

        // edit job
        editJob: async (_, args) => {
            try {
                const id = args.id
                const {title, description, companyId, authorId, jobType, mongo_id} = args.job
                const { data } = await axios({
                    url: JOB_BASE_URL + id,
                    method: 'put',
                    data : {
                        title, 
                        description, 
                        companyId, 
                        authorId, 
                        jobType, 
                        mongo_id
                    }
                })
                await redis.del('jobs')
                await redis.del(`jobs:${args.id}`)
                return {msg: `Edit job with id ${args.id} has been success`}
            } catch (error) {
                throw error
            }
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
}
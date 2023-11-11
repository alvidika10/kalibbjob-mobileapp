const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis-19291.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 19291,
    password: process.env.REDIS_PASSWORD,
})

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    _id: String,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  }

  input UserInput {
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    address: String,
  }

  type Message {
    msg: String
  }

  type Query {
    getUsers: [User],
    getUser(id: String!): User
  }

  type Mutation {
    addUser(user: UserInput): Message,
    deleteUser(id:String): Message
  }
`;

const USER_BASE_URL = process.env.USER_BASE_URL || 'http://service-user:4001/users/'

const resolvers = {
    Query: {

        // get all user 
        getUsers: async () => {
            try {
                let user = await redis.get('users')
                if (!user) {
                    const { data } = await axios({
                        url: USER_BASE_URL, 
                        method: 'get'
                    })
                    user = data
                    await redis.set('users', JSON.stringify(user))
                }
                else {
                    user = JSON.parse(user)
                }
                return user    
            } catch (error) {
                throw error
            }
        },

        // get user by id
        getUser: async (_, args) => {
            try {
                let user = await redis.get(`users:${args.id}`)
                if (!user) {
                    const { data } = await axios({
                        url: USER_BASE_URL + args.id, 
                        method: 'get'
                    })
                    user = data
                    await redis.set(`users:${args.id}`, JSON.stringify(user))
                }
                else {
                    user = JSON.parse(user)
                }
                return user   
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        // add new user
        addUser: async (_, args) => {
            try {
                const {username, email, password, role, phoneNumber, address} = args.user
                const { data } = await axios({
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
                await redis.del('users')
                await redis.del(`users:${args.id}`)
                return {msg: 'Add has been success'}
            } catch (error) {
                throw error
            }
        },

         // edit user
         deleteUser: async (_, args) => {
            try {
                const id = args.id
                console.log(id)

                const { data } = await axios({
                    url: USER_BASE_URL + id,
                    method: 'delete'
                })
                await redis.del('users')
                await redis.del(`users:${args.id}`)
                return {msg: "Success Delete user with id "+ id}
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
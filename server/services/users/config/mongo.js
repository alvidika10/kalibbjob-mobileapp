const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_DB_URI
const dbName = 'datauser'

const client = new MongoClient(uri)

let db = {}

async function connect() {
    try {
        await client.connect()
        db = client.db(dbName)
        return db
    } catch (error) {
        console.log(error)
    }
}

function getDb() {
    return db
}

module.exports = {
    connect, getDb
}
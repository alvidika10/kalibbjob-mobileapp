require('dotenv').config()
const express = require('express')
const router = require('./routes')
const { connect } = require('./config/mongo')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)


connect().then((db) => {
  app.listen(port, () => {
    console.log(`User server Ry listening on port ${port}`)
  })
})

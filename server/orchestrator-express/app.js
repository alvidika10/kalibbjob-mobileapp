require('dotenv').config();
const express = require('express')
const router = require('./routes')
const app = express()
const port = 4000
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`API Gateway Ry listening on port ${port}`)
})

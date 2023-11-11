const express = require('express')
const Users = require('../controllers/user')
const router = express.Router()


router.post('/users', Users.createUser)
router.get('/users', Users.findAllUser)
router.get('/users/:id', Users.findUser)
router.delete('/users/:id', Users.deleteUser)


module.exports = router
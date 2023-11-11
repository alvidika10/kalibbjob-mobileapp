const express = require('express')
const User = require('../controllers/user')
const Job = require('../controllers/job')
const router = express.Router()

// User
router.post('/users', User.createUser)
router.get('/users', User.getUser)
router.get('/users/:id', User.getUserbyId)
router.delete('/users/:id', User.deleteUser)

// Job
router.get('/jobs', Job.getJob)
router.get('/jobs/:id', Job.getJobById)
router.post('/jobs', Job.createJob)
router.delete('/jobs/:id', Job.deleteJob)
router.put('/jobs/:id', Job.updateJob)



module.exports = router
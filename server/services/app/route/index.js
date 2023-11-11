const express = require('express')
const Controller = require('../controllers/controller')
// const authentication = require('../middlewares/authentication')
const router = express.Router()

// cek server
router.get('/', Controller.home)

// client-user
router.get('/pub/jobs', Controller.getJob)
router.get('/pub/jobs/:id', Controller.getJobById)

// client-admin
// login
// router.post('/login', Controller.login)
// router.use(authentication)
// router.post('/register', Controller.register)

// job
router.get('/admin/jobs', Controller.adminJob)
router.get('/admin/jobs/:id', Controller.adminEditGetJobById)
router.post('/admin/jobs', Controller.adminAddJob)
router.delete('/admin/jobs/:id', Controller.adminDeleteJob)
router.put('/admin/jobs/:id', Controller.adminEditJob)

// company
router.get('/admin/company', Controller.adminCompany)
router.get('/admin/company/:id', Controller.adminEditGetCompanyById)
router.post('/admin/company', Controller.adminAddCompany)
router.delete('/admin/company/:id', Controller.adminDeleteCompany)
router.put('/admin/company/:id', Controller.adminEditCompany)


module.exports = router
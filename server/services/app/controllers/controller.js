const { comparePass } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {User, Job, Company, Skill, sequelize} = require('../models/index')

class Controller {

    // Home
    static async home (req, res, next) {
        try {
            res.status(200).json({message: "SELAMAT DATANG REY"})
        } catch (error) {
            next(error)
        }
    }

    // pub get job
    static async getJob (req, res, next) {
        try {
            const job = await Job.findAll(
                {
                    include: [
                        {
                            model: User,
                            attributes: {exclude: ['password']}
                        },
                        {
                            model: Company
                        },
                        {
                            model: Skill
                        }
                    ]
                }
            )
            res.status(200).json(job)
        } catch (error) {
            next(error)
        }
    }

     // pub get job by id
     static async getJobById (req, res, next) {
        try {
            const {id} = req.params
            const job = await Job.findByPk(id, { 
                include: [
                {
                    model: User,
                    attributes: {exclude: ['password']}
                },
                {
                    model: Company
                },
                {
                    model: Skill
                }
            ]})
            res.status(200).json(job)
        } catch (error) {
            next(error)
        }
    }

    // login
    static async login(req, res, next) {
        try {
            const {email, password} = req.body
            if (!email) {
                throw {name: "email_required"}
            }
            if (!password) {
                throw {name: "password_required"}
            }
            const user = await User.findOne({where: {email}})
            if (!user) {
                throw {name: "invalid_email_password"}
            }
            const passwordValid = comparePass(password, user.password) 
            if (!passwordValid) {
                throw {name: "invalid_email_password"}
            }
            const access_token = signToken({id: user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    // register
    static async register(req, res, next) {
        try {
            const {username, email, password, phoneNumber, address} = req.body
            console.log(req.body)
            const newUser = await User.create({username, email, password, role: 'admin', phoneNumber, address})
            res.status(201).json({id: newUser.id, email: newUser.email, role: newUser.role})
        } catch (error) {
            next(error)
        }
    }

    // admin get job
    static async adminJob(req, res, next) {
        try {
            const job = await Job.findAll(
                {
                    include: [
                        {
                            model: Company
                        },
                        {
                            model: Skill
                        }
                    ]
                }
            )
            res.status(200).json(job)
        } catch (error) {
            next(error)
        }
    }

      // admin edit job get data by id
      static async adminEditGetJobById(req, res, next) {
        try {
            const {id} = req.params
            const job = await Job.findByPk(id, {
                include: [
                    {
                        model: Company
                    },
                    {
                        model: Skill
                    }
                ]
            })
            if (!job) {
                throw {name: 'not_found'}
            }
            res.status(200).json(job)
        } catch (error) {
            next(error)
        }
    }

    // admin add job
    static async adminAddJob(req, res, next) {
        const t = await sequelize.transaction()
        try {
            console.log("Add")
            let {title, description, companyId, authorId, jobType, mongo_id, skills} = req.body
            console.log(req.body)
            console.log(title, description, companyId, authorId, jobType, mongo_id, skills)
            const job = await Job.create({title, description, companyId, authorId, jobType, mongo_id}, {transaction: t})
            console.log(skills)

            skills.forEach(element => {
                element.jobId = job.id
            });
            const newSkill = await Skill.bulkCreate(skills, {transaction: t})

            console.log(skills)
            await t.commit()      
            res.status(201).json({message: "Add job and skill success"})
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    // admin delete job
    static async adminDeleteJob(req, res, next) {
        try {
            console.log("DELETE JOB")
            const {id} = req.params
            const findJob = await Job.findByPk(id)
            if (!findJob) {
                throw {name: 'not_found'}
            }
            const deleteJob = await findJob.destroy({where: {id}})
            res.status(200).json({message: `Job with id ${id} has been deleted`})
        } catch (error) {
            next(error)
        }
    }

    // admin edit job
    static async adminEditJob(req, res, next) {
        try {
            console.log("EDIT JOB")
            const {id} = req.params
            const {title, description, companyId, authorId, jobType, mongo_id} = req.body
            const findJob = await Job.findByPk(id)
            if (!findJob) {
                throw {name: 'not_found'}
            }
            const updateJob = await findJob.update({title, description, companyId, authorId, jobType, mongo_id})
            res.status(200).json(updateJob)
        } catch (error) {
            next(error)
        }
    }

    // admin Company
    static async adminCompany(req, res, next) {
        try {
            const company = await Company.findAll()
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }

    // admin add company
    static async adminAddCompany(req, res, next) {
        try {
            const {name, companyLogo, location, email, description} = req.body
            console.log(name, companyLogo, location, email, description)
            const newCompany = await Company.create({name, companyLogo, location, email, description})
            res.status(201).json(newCompany)
        } catch (error) {
            next(error)
        }
    }

    // admin delete company
    static async adminDeleteCompany(req, res, next) {
        try {
            const {id} = req.params
            const findCompany = await Company.findByPk(id)
            if (!findCompany) {
                throw {name: 'not_found'}
            }
            const deleteCompany = await findCompany.destroy({where: {id}})
            res.status(200).json({message: `Company with id ${id} has been delete`})
        } catch (error) {
            next(error)
        }
    }

    // admin edit get data by id
    static async adminEditGetCompanyById(req, res, next) {
        try {
            const {id} = req.params
            const company = await Company.findByPk(id)
            if (!company) {
                throw {name: 'not_found'}
            }
            res.status(200).json(company)
        } catch (error) {
            next(error)
        }
    }

    // admin edit company
    static async adminEditCompany(req, res, next) {
        try {
            const {id} = req.params
            const {name, companyLogo, location, email, description} = req.body
            const findCompany = await Company.findByPk(id)
            if (!findCompany) {
                throw {name: 'not_found'}
            }
            const updateCompany = await findCompany.update({name, companyLogo, location, email, description})
            res.status(201).json(updateCompany)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller
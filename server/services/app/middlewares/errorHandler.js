function errorhandler(err, req, res, nexr) {
    console.log(err, '<<<<<< ERROR HANDLER')

    let status = 500
    let message = "Internal server error "

    if (err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
        status = 400
        message = err.errors[0].message
    }
    else if (err.name === "email_required") {
        status = 400
        message = "Email is required"
    }
    else if (err.name === "password_required") {
        status = 400
        message = "Password is required"
    }
    else if (err.name === "not_found") {
        status = 404
        message = "Data not found"
    }
    else if (err.name === "title_not_found") {
        status = 404
        message = "Title not found"
    }
    else if (err.name === "description_not_found") {
        status = 404
        message = "Description not found"
    }
    else if (err.name === "job_type_not_found") {
        status = 404
        message = "Job type not found"
    }
    else if (err.name === "name_not_found") {
        status = 404
        message = "Name not found"
    }
    else if (err.name === "level_not_found") {
        status = 404
        message = "Level not found"
    }
    if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid token"
    }

    
    res.status(status).json({message})
}

module.exports = errorhandler
function errorHandler(err, res, res, next) {
    console.log(err, '<<<<<< ERROR HANDLER')

    let status = 500
    let message = "Internal server error "

    if (err.name === 'email_required') {
        status = 400
        message = 'Email is required'
    }
    else if (err.name === 'pass_required') {
        status = 400
        message = 'Password is required'
    }
    else if (err.name === 'not_found') {
        status = 404
        message = 'User not found'
    }
    else if (err.name === 'must_unique') {
        status = 400
        message = 'Email must unique'
    }
    else if (err.name === 'BSONError') {
        status = 400
        message = 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer'
    }

    res.status(status).json({message})
}

module.exports = errorHandler
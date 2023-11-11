function errorHandler(err, res, res, next) {
    console.log(err, '<<<<<< ERROR HANDLER')

    let status = 500
    let message = "Internal server error"

    if (err.message === 'Request failed with status code 404') {
        status = 404
        message = err.response.data.message
    }
    else if (err.message === 'Request failed with status code 400') {
        status = 400
        message = err.response.data.message
    }

    res.status(status).json({message})
}

module.exports = errorHandler
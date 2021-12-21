const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomAPIError) {
        return res.status(err.status).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong, try again later' })
}

module.exports = errorHandlerMiddleware;
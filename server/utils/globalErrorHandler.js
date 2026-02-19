const AppError = require("./errorHandler");

function globalErrorHandler(err,req,res,next){
    if(err instanceof AppError){
       return res.status(err.statusCode).json({
            error : err.message
        })
    }
    return res.status(500).json({
        error : "INTERNAL_SERVER_ERROR"
    })
}

module.exports = globalErrorHandler
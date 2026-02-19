function validateInput(req,res,next) {
    if(!req.body || !req.body.email || !req.body.password){
        return res.status(400).json({
            message : "Invalid input"
        })
    }
    next()
}
module.exports = validateInput
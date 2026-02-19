const pool = require('../db')
const {redis} = require('../lib/redis/redis')
const AppError = require('../utils/errorHandler')

async function guestUsersOnly(req,res,next){
    if(!req.cookies || !req.cookies.session_id){
        console.log(1)
        return next()
    }
    const sessionId = req.cookies.session_id
    const result = await pool.query(
        `SELECT user_id FROM sessions WHERE session_id = $1 AND expires_at > NOW()`,
        [sessionId]
    )
    if(!result.rowCount){
        next()
    }
    const userId = result.rows[0].user_id
    return res.redirect(`/profile`)
}

async function authenticatedUsersOnly(req,res,next){
    if(!req.cookies || !req.cookies.session_id){
            return res.status(401).json({
                message : "Unauthorized"
            })
    }
    const sessionCookie = req.cookies.session_id
    const data = await redis.get(`session:${sessionCookie}`)
    console.log(data)
    if(!data){
        throw new AppError(401,'UNAUTHORIZED')
    }
    const session = JSON.parse(data)
    req.user = {
        id : session.userId,
    }
    console.log (req.user)
    next()
}   

module.exports = {
    guestUsersOnly,
    authenticatedUsersOnly
}
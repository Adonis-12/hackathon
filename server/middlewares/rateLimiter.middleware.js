const { redis } = require("../lib/redis/redis")
const AppError = require("../utils/errorHandler")
const WINDOW_SIZE = 60
const MAX_LIMIT = 3
async function rateLimiter(req,res,next){
    const identifier = req.user?.id || req.ip
    const key = `rate:${identifier}`
    const requests = await redis.incr(key)

    if(requests === 1){
        await redis.expire(key,WINDOW_SIZE)
    }
    if(requests > MAX_LIMIT){
        throw new AppError(429,"TOO MANY REQUESTS")
    }
    next()
}

module.exports = rateLimiter
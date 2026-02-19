const {createClient} = require('redis')

const redis = createClient({
    url : process.env.REDIS_URL
});

redis.on('error', err => console.log('Redis Client Error', err));

async function connectRedis(){
    await redis.connect();
}

module.exports = {
    redis,
    connectRedis
}


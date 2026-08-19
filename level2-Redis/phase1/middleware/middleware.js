import redis from "../index.js";
const ratelimiter = async (req, res, next) => {
    const ip = req.ip;
    console.log("ip:", ip);
    const keys = await redis.keys("*");
    console.log("keyss:", keys);
    const key = `rate_limit:${ip}`;
    const requests = await redis.incr(key);
    console.log('requests: ', requests)
    console.log("redis key: ", await redis.get(key))
    if(requests == 1) {
        await redis.expire(key, 20);
    }
    if(requests > 5) {
        return res.status(429).json({message: "Too many requests"});
    }
    next();
}

export default ratelimiter;
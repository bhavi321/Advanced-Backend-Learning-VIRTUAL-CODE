import express from "express";
import dotenv from "dotenv";
import Redis from "ioredis";
import connectDB from "./lib/db.js";
import userModel from "./models/userModel.js";
import ratelimiter from "./middleware/middleware.js";
import emailQueue from "./queue.js";


const env = dotenv.config();

const app = express();
app.use(express.json());


const redis = new Redis(process.env.REDIS_URL);

const port = process.env.PORT || 3001;

async function startServer() {
    await connectDB();
    app.listen(port, ()=> {
    console.log(`server listening on port ${port}`);
    })
}
startServer();

app.get('/', (req, res) => {
    return res.status(200).send({message: "Hello from server"});
})

//without redis: Time: 166 ms

app.post('/create', async (req, res) => {
    try {
        const body = req.body;
        const {user, email, password} = body;
        await userModel.create({user, email, password});
        console.log("created user:", {user, email, password})
        await redis.del("user:all");
        console.log("deleted all users from redis");
        await emailQueue.add("send-email", email);
        return res.status(201).send({message: "created"});
    }
    catch (error) {
        console.log(error);
        throw error;
    }
})

// without redis: Time: 73 ms
app.get('/get',ratelimiter, async (req, res) => {
    try {
        const allUsers = await userModel.find({});
        return res.status(200).send(allUsers);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
})

// with redis:   Cache miss-Time:151 ms  |  Cache hit-Time:35 ms
app.get('/get-with-redis', async (req, res) => {
    try {
        const cachedUsers = await redis.get("user:all");
        if(cachedUsers) {
            const parsed = JSON.parse(cachedUsers)
            console.log("Cache hit: All users");
            return res.json(JSON.parse(cachedUsers));
        }
        const allUsers = await userModel.find({});

        await redis.set("user:all", JSON.stringify(allUsers));
        console.log("Cache miss: saved all users in cache")
        return res.status(200).send(allUsers);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
})

app.delete('/delete-redis-keys', async (req, res) => {
    const keys = await redis.keys("rate_limit:*");
    console.log("keys:", keys)
    if (keys.length) {
    await redis.del(...keys);
    }
    return res.status(200).json({message: "Deleted all Keys"});
})

export default redis;
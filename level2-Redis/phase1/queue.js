import "dotenv/config";
import { Queue } from "bullmq";
import Redis from "ioredis";

export const connection = new Redis(process.env.REDIS_URL, {maxRetriesPerRequest: null});

const emailQueue = new Queue("sendEmail", {connection});

export default emailQueue;
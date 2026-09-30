import { Worker } from "bullmq";
import { connection } from "./queue.js";
import sendEmail from "./sendEmail.js";

const worker = new Worker("sendEmail", async (job) => {
    console.log("worker picked job");
    const email = job.data;
    console.log("job-data: ",job.data);
    await sendEmail(email);
}, {connection});
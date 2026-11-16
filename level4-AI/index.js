import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get('/', `Hello from backend`);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})
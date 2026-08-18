import express from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello from docker" });
});

app.listen(port, () => {
    console.log(`server started at ${port}`)
})
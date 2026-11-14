import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})

app.get("/", (req, res) => {
    const gatewayName = req.get("x-gateway-name");
    const message = gatewayName
        ? `Hello from ${gatewayName} and auth service.`
        : "Hello from auth service.";

    return res.status(200).json({message})
})
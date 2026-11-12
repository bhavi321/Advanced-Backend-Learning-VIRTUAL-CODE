import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => { 
    return res.status(200).json({message: "Hello from backend or gateway"});
 })

app.use("/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/product", proxy(process.env.PRODUCT_SERVICE_URL));
app.use("/order", proxy(process.env.ORDER_SERVICE_URL));

app.listen(port, () => {
   console.log( `Server listening on port: ${port}`);
})
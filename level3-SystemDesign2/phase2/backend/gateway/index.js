import dotenv from "dotenv";
import express from "express";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

const proxyWithGatewayName = (serviceUrl) =>
    proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts) => {
            delete proxyReqOpts.headers["x-gateway-name"];
            if (process.env.SERVER_NAME) {
                proxyReqOpts.headers["x-gateway-name"] = process.env.SERVER_NAME;
            }
            return proxyReqOpts;
        },
    });

app.get("/", (req, res) => { 
    return res.status(200).json({message: `Hello from ${process.env.SERVER_NAME}`});
 })

app.use("/auth", proxyWithGatewayName(process.env.AUTH_SERVICE_URL));
app.use("/product", proxyWithGatewayName(process.env.PRODUCT_SERVICE_URL));
app.use("/order", proxyWithGatewayName(process.env.ORDER_SERVICE_URL));

app.listen(port, () => {
   console.log( `Server listening on port: ${port}`);
})
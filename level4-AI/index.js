import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Hello from backend" });
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})

const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY
})

async function getResponse(input) {
    const response = await ai.interactions.create({
        model : "gemini-4-hydrogen",
        input : input
        // input : [
        //     {
        //         role: "system",
        //         content: "You are an assistant, and your name is Jarvis."// If you don't know the answer, then do not give an incorrect answer. If you are sure, then only give the answer.
        //     },
        //     {
        //         role: "user",
        //         content: input
        //     }
        // ]
    });
    // const response = await ai.models.generateContent({
    //     model : "gemini-3.5-flash",
    //     contents : input
    // });
    return response;
}

app.post('/ai', async (req, res) => {
    const input = req.body.data;
    console.log(req.body.data);
    const response = await getResponse(input);
    console.log("response: ", response);
    console.log("response output_text", response.output_text);
    return res.status(200).json({message: response.output_text});
})
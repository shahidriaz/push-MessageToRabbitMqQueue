import express, { json } from "express"
import { PutMessageToQueue } from "./messagebroker/message-broker-rabbitmq.js";
import dotenv  from "dotenv"

const PORT = "5059";
dotenv.config();


const app = express();
app.use(express.json());
//Write a Post method which accepts call the PutMessageToQueue from the request body
app.post("/", (req,res)=>{
    const message = req.body;
    PutMessageToQueue(JSON.stringify(message));    
    console.info("This code will be executed just after sending the call to send message to queue and will continiue doing its job");
    for(let i = 0; i < 100; i ++)
    {
        console.log(`${i} x 2 = ${i*2}`);
    }
    res.send(req.body);
});
app.listen(PORT, ()=>{
    console.info(`Server is listening on PORT ${PORT}`);
});
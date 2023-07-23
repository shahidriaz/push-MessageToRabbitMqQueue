import { PutMessageToQueue } from "./messagebroker/message-broker-rabbitmq.js";
import dotenv  from "dotenv"

dotenv.config();


let message = '"{"message":"Hello"}"';
console.log(message);
PutMessageToQueue(message);
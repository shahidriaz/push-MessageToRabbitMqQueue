import amqp from "amqplib" // imported this package to induct connection and interaction with the rabbitmq

// Write a method which is responsible to connect with the rabbitmq-server
async function connectWithRabbitMqAndGiveChannel(){
    try {
            const username = process.env.username;
            console.log(`User Name is ${username}`);
            const password = process.env.password;
            console.log(`password is ${password}`)
            const host = process.env.RABBITMQ_HOST;
            console.log(`RabbitMQ Server URL  is ${host}`)
            const port = process.env.RABBITMQ_PORT;
            console.log(`RabbitMQ Server Port is ${port}`)
            const url = `amqp://${username}:${password}@${host}:${port}`;
            console.log(`Complete connection String is ${url}`)
            const connection = await amqp.connect(url);
            connection.on('error', (err)=>{
                console.error(`Error ${err} while establishing the connection with rabbitmq`)
            });
            const channel = await connection.createChannel();
            channel.on('error', (err)=>{
                console.error(`There error ${err} occured while creating the channel`);
            });
            return channel;
         } catch (error) {
        console.error('Error occured:', error);
      }
}
//Method to Send message to the queue
async function PutMessageToQueue(message)
{
    const queue_name = process.env.queue_name;
    let ch = null;
    try
    {
        ch = await connectWithRabbitMqAndGiveChannel();
    }catch(error){
        console.error(`An error is occured while connecting with the queue named ${queue_name}`);
        return;
    }
    try{
        ch.sendToQueue(queue_name, Buffer.from(message), { persistent: true });

    }catch(error){
        console.error(`unable to send message to the queue ${queue_name} due to error ${error}`)
        return;
    }
    console.log(`Message sent to the queue ${queue_name}`);
}
export {PutMessageToQueue}
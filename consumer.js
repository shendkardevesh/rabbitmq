require('dotenv').config();
const amqp = require('amqplib');
const mongoose = require('mongoose');
const messageController = require('./controller/message');

mongoose.connect(process.env.mongodbConnectionUrl, {
  keepAlive:1,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const mongoConnection = mongoose.connection;
mongoConnection.on('connected', () => {
  console.log('connected to db successfully');
})
mongoConnection.on('error', () => {
  throw new Error(`unable to connect to database`);
}); 

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const result = await channel.assertQueue('insertRecord');
    
    
    channel.consume('insertRecord', async message => {
      const msg = JSON.parse(message.content.toString());
      console.log(`message received successfully`);
      console.log(msg)
      if (msg.name && msg.message) {
        await messageController.save(msg);
      }
      channel.ack(message);
    });
    console.log('waiting for message to receive');
  } catch(err) {
    console.error(err);
  }
}

connect();

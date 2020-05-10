const amqp = require('amqplib');
const argument = process.argv.slice(2);

const msg = {
  name: argument[0],
  message: argument[1]
};

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    const result = await channel.assertQueue('insertRecord');
    
    if (!msg.name && !msg.message) {
      connection.close();
      throw('please pass arguments to send message');
    }

    channel.sendToQueue('insertRecord', Buffer.from(JSON.stringify(msg)));
    console.log(`Job send successfully ${msg}`);

  } catch(err) {
    console.error(err);
  }
}

connect();

import amqp from "amqplib";

let channel;
let connection;

export const connectRabbitMQ = async () => {
  connection = await amqp.connect(process.env.RABBITMQ_URL);

  channel = await connection.createChannel();

  await channel.assertQueue("deadLetterQueue", {
    durable: true,
  });

  await channel.assertQueue("emailQueue", {
    durable: true,
    deadLetterExchange: "",
    deadLetterRoutingKey: "deadLetterQueue",
  });

  console.log("✅ RabbitMQ Connected");
};

export const getChannel = () => channel;
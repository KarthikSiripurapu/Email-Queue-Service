import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

import app from "./app.js";
import connectDB from "./config/db.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import { startWorker } from "./queues/worker.js";

const startServer = async () => {
  try {
    await connectDB();

    await connectRabbitMQ();

    await startWorker();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log(error);
  }
};

startServer();
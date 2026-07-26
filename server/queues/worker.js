import { getChannel } from "../config/rabbitmq.js";
import { sendEmail } from "../services/emailService.js";

const QUEUE = "emailQueue";

export const startWorker = async () => {
  const channel = getChannel();

  channel.consume(QUEUE, async (msg) => {
    if (msg !== null) {
      const email = JSON.parse(msg.content.toString());

      console.log("📨 Processing Email:");
      console.log(email);

      await sendEmail(email);

      channel.ack(msg);
    }
  });

  console.log("👷 Worker Started...");
};
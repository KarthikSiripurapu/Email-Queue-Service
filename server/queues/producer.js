import { getChannel } from "../config/rabbitmq.js";

const QUEUE = "emailQueue";

export const publishEmail = async (email) => {
  const channel = getChannel();

  channel.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(email))
  );

  console.log("📤 Email added to Queue");
};
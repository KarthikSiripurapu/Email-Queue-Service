import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import Email from "../models/Email.js";
import { getChannel } from "../config/rabbitmq.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const MAX_RETRIES = 3;

export const sendEmail = async (email) => {
  try {
    await Email.findByIdAndUpdate(email._id, {
      status: "processing",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.to,
      subject: email.subject,
      text: email.body,
    });

    await Email.findByIdAndUpdate(email._id, {
      status: "sent",
    });

    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.log("❌ Email Sending Failed");

    const currentEmail = await Email.findById(email._id);

    if (currentEmail.retries < MAX_RETRIES) {
      await Email.findByIdAndUpdate(email._id, {
        retries: currentEmail.retries + 1,
        status: "pending",
      });

      console.log(`🔁 Retry ${currentEmail.retries + 1}`);

      return sendEmail({
        ...currentEmail.toObject(),
        retries: currentEmail.retries + 1,
      });
    }

    await Email.findByIdAndUpdate(email._id, {
      status: "failed",
    });

    const channel = getChannel();

    channel.sendToQueue(
      "deadLetterQueue",
      Buffer.from(JSON.stringify(email)),
      {
        persistent: true,
      }
    );

    console.log("☠️ Email moved to Dead Letter Queue");
  }
};
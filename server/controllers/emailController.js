import Email from "../models/Email.js";
import { publishEmail } from "../queues/producer.js";

export const sendEmail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    const email = await Email.create({
      to,
      subject,
      body,
    });

    await publishEmail(email);

    res.status(201).json({
      success: true,
      message: "Email stored successfully",
      data: email,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
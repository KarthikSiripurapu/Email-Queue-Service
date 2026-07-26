import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "sent", "failed"],
      default: "pending",
    },

    retries: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Email", emailSchema);
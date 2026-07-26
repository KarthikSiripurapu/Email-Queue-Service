import express from "express";
import cors from "cors";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Email Queue Service API Running",
  });
});

export default app;
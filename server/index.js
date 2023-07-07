import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.routes.js";
import questionRoutes from "./routes/Questions.routes.js";
import answerRoutes from "./routes/Answers.routes.js";
import chatRoutes from "./routes/ChatAi.routes.js";
import socialRoutes from "./routes/Social.routes.js";
import subsRoutes from "./routes/subscription.routes.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/chat/", chatRoutes);
app.use("/user/", userRoutes);
app.use("/questions/", questionRoutes);
app.use("/answer/", answerRoutes);
app.use("/social/post/", socialRoutes);
app.use("/subscription", subsRoutes);

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;
console.log(DATABASE_URL);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

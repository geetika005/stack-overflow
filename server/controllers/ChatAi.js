import mongoose from "mongoose";
const Types = mongoose.Types;
import axios from "axios";
import Chat from "../models/chatAi.js";

export const postChat = async (req, res) => {
  const userId = req.userId;
  const { message } = req.body;

  if (!Types.ObjectId.isValid(userId)) {
    return res.status(404).send("user not found...");
  }

  const options = {
    method: "POST",
    url: `${process.env.TEXT_TO_CODE_URL}/generate`,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.TEXT_TO_CODE_KEY,
      "X-RapidAPI-Host": process.env.TEXT_TO_CODE_HOST,
    },
    data: {
      input: message,
    },
  };

  try {
    let results = await axios.request(options);
    console.log(results.data.message);
    const chat = await Chat.findByIdAndUpdate(
      userId,
      {
        userId: userId,
        $addToSet: {
          chat: [
            {
              message: message,
              contentType: "message",
              role: "user",
            },
            {
              message: results.data.message,
              contentType: "code",
              role: "chat",
            },
          ],
        },
      },
      { new: true, upsert: true }
    ).lean();
    res.status(200).json({ success: true, chat: chat });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "error in updating",
    });
  }
};

export const getChat = async (req, res) => {
  const userId = req.userId;
  try {
    if (!Types.ObjectId.isValid(userId)) {
      res.status(401).json({
        success: false,
        message: "Please login!",
      });
      return;
    }
    const chat = await Chat.findOne({ userId }).lean();
    if (!chat) {
      res.status(404).json({
        success: false,
        message: "chat not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      chat: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

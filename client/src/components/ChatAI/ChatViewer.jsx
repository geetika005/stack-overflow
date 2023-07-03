import React, { useEffect } from "react";
import { ChatCodeBox } from "./ChatCodeBox";
import { ChatUserMessageBox } from "./ChatUserMessageBox";
import "./chat.css";
import { useSelector } from "react-redux";
import { ChatEmpty } from "./ChatEmpty";
import { ChatLoading } from "./ChatLoading";
export const ChatViewer = () => {
  const chatAi = useSelector((state) => state.chatReducer);

  useEffect(() => {
    console.log(chatAi);
  }, [chatAi]);

  return (
    <div>
      {chatAi.isLoading ? (
        <ChatLoading />
      ) : chatAi.chat && Array.isArray(chatAi.chat) ? (
        chatAi.chat.map((message, index) =>
          index % 2 !== 0 ? (
            <ChatCodeBox codeString={message.message} key={`${message._id}`} />
          ) : (
            <ChatUserMessageBox
              message={message.message}
              key={`${message._id}`}
            />
          )
        )
      ) : (
        <ChatEmpty />
      )}
    </div>
  );
};

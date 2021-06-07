import React, { useContext } from "react";
import { AppContext } from "../core/State";

import { IonImg } from "@ionic/react";
import Utility from "../core/Utility";
import "./ChatMessage.css";

const ChatMessage = ({ chat }: any) => {
  const { state, dispatch } = useContext(AppContext);

  let chat_time = Utility.getTime(chat.time);
  let converted_image =
    chat.type === "media" ? "data:image/jpeg;base64," + chat.file_url : "";

  let messageStyles: any = {};

  if (state.user.authId === chat.sent_by) {
    messageStyles.backgroundColor = "#dcf8c6";
    messageStyles.float = "right";
  }
  return (
    <div style={{ clear: "both" }}>
      <div className="chat-message-box" style={messageStyles}>
        {chat.type === "media" && <IonImg src={converted_image} />}
        {chat.message}
        <div className="message-time">{chat_time}</div>
      </div>
    </div>
  );
};

export default ChatMessage;

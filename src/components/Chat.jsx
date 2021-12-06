import React, { useState, useEffect } from "react";
import "../App.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  async function sendMessage() {
    if (currentMessage === "") return;
    const messageData = {
      room,
      username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageData);
    setMessageList((curMes) => {
      return [...curMes, messageData];
    });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((curMes) => {
        return [...curMes, data];
      });
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div className="flex flex-col">
              <div className="flex">
                <p>{messageContent.username}</p>
                <p>{messageContent.time}</p>
              </div>
              <p>{messageContent.message}</p>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="message"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

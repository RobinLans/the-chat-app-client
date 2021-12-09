import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { roomAndUserCtx } from "../Context";

function ChatRoom() {
  const params = useParams();
  const { roomAndUser } = useContext(roomAndUserCtx);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log(params.id);
  console.log(roomAndUser);

  async function sendMessage() {
    if (currentMessage === "") return;
    const messageData = {
      room: roomAndUser.roomName,
      username: roomAndUser.username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await roomAndUser.socket.emit("send_message", messageData);
    setMessageList((curMes) => {
      return [...curMes, messageData];
    });

    setCurrentMessage("");
  }

  useEffect(() => {
    roomAndUser.socket.on("receive_message", (data) => {
      setMessageList((curMes) => {
        return [...curMes, data];
      });
    });
  }, [roomAndUser.socket]);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="relative h-chatSmall w-chatSmall xl:h-chatBig xl:w-chatBig border-black border-veryThick flex justify-center">
        <h1 className="absolute -top-14 text-3xl font-semibold">
          {roomAndUser.roomName}
        </h1>
        <div className="relative flex flex-col h-full w-3/4">
          <div className=" h-full w-full">
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
          <input
            type="text"
            value={currentMessage}
            className="h-20 border-t-extraThick border-black pl-2 pr-24 focus:outline-none"
            placeholder="Message"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          />
          <button
            className="absolute m-0 buttons bottom-1 right-1"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
        <div className="h-full w-1/4 border-l-extraThick border-black"></div>
      </div>
    </div>
  );
}

export default ChatRoom;

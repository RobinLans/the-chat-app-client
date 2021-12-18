import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import { roomAndUserCtx } from "../Context";

function ChatRoom() {
  const params = useParams();
  const scrollRef = useRef();
  const { roomAndUser } = useContext(roomAndUserCtx);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [users, setUsers] = useState([]);

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ""; // Legacy method for cross browser support
    }
    return ""; // Legacy method for cross browser support
  };

  async function sendMessage() {
    if (currentMessage === "") return;
    const messageData = {
      room: roomAndUser.roomName,
      username: roomAndUser.username,
      message: currentMessage,
      time:
        `${new Date().getHours()}`.padStart(2, 0) +
        ":" +
        `${new Date().getMinutes()}`.padStart(2, 0),
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
    roomAndUser.socket.on("get_users", (data) => {
      console.log(data);
      setUsers((prev) => {
        return [...prev, data.username];
      });
    });
  }, [roomAndUser.socket]);

  useEffect(() => {
    const info = {
      username: roomAndUser.username,
      room: roomAndUser.roomName,
    };

    setUsers((prev) => [...prev, roomAndUser.username]);
    roomAndUser.socket.emit("new_user", info);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  function handleKeyPress(e) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div className="h-full flex justify-center items-center">
      <div className="relative h-chatSmall w-chatSmall 2xl:h-chatBig 2xl:w-chatBig border-black border-veryThick flex justify-center">
        <h1 className="absolute -top-14 text-3xl font-semibold">
          {roomAndUser.roomName}
        </h1>
        <div className="relative flex flex-col h-full w-full">
          <div className="h-full w-full p-2 overflow-auto">
            {messageList.map((messageContent, i) => (
              <div ref={scrollRef}>
                <Message
                  message={messageContent.message}
                  time={messageContent.time}
                  key={i}
                  username={messageContent.username}
                />
              </div>
            ))}
          </div>
          <input
            type="text"
            value={currentMessage}
            className="h-20 border-t-extraThick border-black pl-2 pr-24 focus:outline-none"
            placeholder="Message"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute buttons w-20 bottom-1 xl:bottom-1.5 right-1"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
        <div className="h-full w-1/4 border-l-extraThick border-black p-2 overflow-auto">
          {users.map((user) => (
            <p className="text-2xl font-semibold my-2">{user}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;

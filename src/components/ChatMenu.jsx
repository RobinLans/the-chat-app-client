import React, { useState, useContext, useRef, useEffect } from "react";
import Rooms from "./Rooms";
import { roomAndUserCtx } from "../Context";

function ChatMenu() {
  const [rooms, setRooms] = useState([
    {
      name: "niceRoom",
      id: 1111,
    },
    {
      name: "TheCoolRoom",
      id: 2222,
    },
    {
      name: "TheNotAsCoolRoom",
      id: 3333,
    },
  ]);
  const { roomAndUser } = useContext(roomAndUserCtx);
  const socket = useRef(roomAndUser.socket);

  console.log(socket);

  useEffect(() => {});

  console.log(roomAndUser);

  return (
    <div className="flex">
      <div className="CMcontainers">
        <div className="flex">
          <p className="chatMenuTextBlack">Join a Chat</p>
          <p className="chatMenuTextPink">Room</p>
        </div>
        <div className="CMBoxes">
          {rooms?.map((room) => (
            <Rooms room={room.name} key={room.id} id={room.id} />
          ))}
        </div>
        {/* <button className="buttons text-lg w-44 mt-2 ">New Chat Room</button> */}
      </div>
      {/* <div className="CMcontainers">
        <div className="flex">
          <p className="chatMenuTextBlack">Talk in</p>
          <p className="chatMenuTextPink">Private</p>
        </div>
        <div className="CMBoxes"></div>
      </div> */}
    </div>
  );
}

export default ChatMenu;

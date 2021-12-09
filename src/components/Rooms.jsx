import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { roomAndUserCtx } from "../Context";

function Rooms({ room, id }) {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const { roomAndUser, setRoomAndUser } = useContext(roomAndUserCtx);

  function goToRoom() {
    console.log(roomAndUser);
    console.log(id);
    setRoomAndUser((prev) => {
      return {
        ...prev,
        roomName: room,
        roomId: id,
      };
    });
    joinRoom();
    navigate(`/chatroom/${id}`);
  }

  function joinRoom() {
    if (roomAndUser.username !== "" && room !== "") {
      roomAndUser.socket.emit("join_room", room);
    }
  }

  return (
    <div
      className="w-full h-10 flex justify-between items-center pl-1 pr-2 hover:bg-gray-100 cursor-default"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <p className="text-lg font-semibold">{room}</p>
      {hovering && (
        <button
          className="text-primary"
          onClick={goToRoom}
          // to={`/chatroom/${id}`}
        >
          Join
        </button>
      )}
    </div>
  );
}

export default Rooms;

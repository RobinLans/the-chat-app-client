import React, { useState, useContext, useEffect } from "react";
import ChatMenu from "../components/ChatMenu";
import { roomAndUserCtx } from "../Context";

function Home() {
  const { roomAndUser, setRoomAndUser } = useContext(roomAndUserCtx);
  const [username, setUsername] = useState("");
  const [showChatMenu, setChatMenu] = useState(false);

  function goToMenu() {
    if (username.length === 0) return;
    console.log(username);
    setRoomAndUser((prev) => {
      console.log(prev);
      return {
        ...prev,
        username,
      };
    });
    setChatMenu(true);
  }

  useEffect(() => {
    if (roomAndUser?.username?.length > 0) setChatMenu(true);
  }, [username]);

  return (
    <div className="h-full flex justify-center items-center">
      {!showChatMenu ? (
        <div>
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="State Your Name"
              className="w-96 h-40 border-extraThick border-black text-center text-2xl my-2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button className="buttons" onClick={goToMenu}>
              Join
            </button>
          </div>
        </div>
      ) : (
        <ChatMenu username={username} />
      )}
    </div>
  );
}

export default Home;

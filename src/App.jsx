import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomAndUserCtx } from "./Context";
import routes from "./routes";
import io from "socket.io-client";

const socket = io.connect(
  "http://localhost:4000"
  // "https://the-chat-app-dj.herokuapp.com/"
);

function App() {
  const navigate = useNavigate();
  const [roomAndUser, setRoomAndUser] = useState({
    username: null,
    roomName: null,
    roomId: null,
    socket,
  });

  function goHome() {
    console.log("hora");
    navigate("/");
  }

  return (
    <div className="h-screen w-screen font-nunito bg-backGround">
      <div
        className="flex absolute left-0 top-0 cursor-pointer"
        onClick={goHome}
      >
        <h1 className="headerText">The</h1>
        <h1 className="headerText text-primary">Chat</h1>
        <h1 className="headerText">App</h1>
      </div>
      <roomAndUserCtx.Provider value={{ roomAndUser, setRoomAndUser }}>
        <>{routes}</>
      </roomAndUserCtx.Provider>
    </div>
  );
}

export default App;

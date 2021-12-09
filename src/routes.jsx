import { Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Home from "./pages/Home";

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/chatroom/:id" element={<ChatRoom />} />
  </Routes>
);

export default routes;

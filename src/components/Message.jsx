import React from "react";

function Message({ username, time, message }) {
  return (
    <div className="flex flex-col mt-2">
      <div className="flex">
        <p className="text-xl font-semibold">{username}</p>
        <p className="text-lg ml-2 text-gray-400 ">{time}</p>
      </div>
      <p className="text-lg">{message}</p>
      <hr width="100%" className="mt-2" />
    </div>
  );
}

export default Message;

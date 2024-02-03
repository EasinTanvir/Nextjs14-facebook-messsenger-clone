import React from "react";
import Chat from "./Chat";

const RightSideBar = () => {
  return (
    <div className="max-w-64 min-w-64 py-4 lg:flex hidden flex-col gap-6 items-center border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div>
        <h1 className="font-semibold ">Chat with your friends</h1>
      </div>
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </div>
  );
};

export default RightSideBar;

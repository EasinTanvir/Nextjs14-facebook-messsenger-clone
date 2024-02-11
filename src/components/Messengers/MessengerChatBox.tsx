import React from "react";
import MessageNavbar from "./MessageNavbar";
import MessageInputbox from "./MessageInputbox";
import Sender from "./Sender";
import Receiver from "./Receiver";

const MessengerChatBox = ({ open, setOpen }: { open: any; setOpen: any }) => {
  return (
    <div
      className={`flex-1 border relative ${!open ? "sm:block hidden " : ""}`}
    >
      <MessageNavbar open={open} setOpen={setOpen} />
      <div className="flex flex-col h-full esm:max-h-[468px] max-h-[658px] overflow-y-auto ">
        <Receiver />
        <Sender />
        <Sender />
        <Sender />
        <Sender />
      </div>
      <div className="absolute bottom-0 w-full left-0">
        <MessageInputbox />
      </div>
    </div>
  );
};

export default MessengerChatBox;

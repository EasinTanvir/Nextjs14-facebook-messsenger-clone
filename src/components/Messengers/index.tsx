"use client";
import MessengerSide from "./MessengerSide";
import MessengerChatBox from "./MessengerChatBox";
import { useState } from "react";

const Messengers = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-[calc(100vh-64px)] flex">
      <MessengerSide open={open} setOpen={setOpen} />
      <MessengerChatBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default Messengers;

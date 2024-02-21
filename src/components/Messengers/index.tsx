"use client";
import MessengerSide from "./MessengerSide";
import MessengerChatBox from "./MessengerChatBox";
import { Suspense, useState } from "react";
import { SkeletonCard } from "../Extra";

const Messengers = ({ conver }: { conver: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      <MessengerSide open={open} setOpen={setOpen} conver={conver} />

      <MessengerChatBox open={open} setOpen={setOpen} />
    </div>
  );
};

export default Messengers;

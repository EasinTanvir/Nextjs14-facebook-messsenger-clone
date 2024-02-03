import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Chat = () => {
  return (
    <div className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-md">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold">EasinTanvir</p>
      </div>
    </div>
  );
};

export default Chat;

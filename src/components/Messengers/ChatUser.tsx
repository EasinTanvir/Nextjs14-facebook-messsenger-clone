"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const ChatUser = ({ setOpen }: { setOpen: any }) => {
  const { data: session } = useSession();
  return (
    <React.Fragment>
      <div
        onClick={() => setOpen(true)}
        className=" flex items-center gap-2  mt-2 hover:bg-slate-300 px-2 rounded-md cursor-pointer py-2"
      >
        <Avatar src={session?.user.image} alt={session?.user.name} />
        <div className="-space-y-1">
          <p className="font-bold">{session?.user.name}</p>
          <p>hello</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatUser;

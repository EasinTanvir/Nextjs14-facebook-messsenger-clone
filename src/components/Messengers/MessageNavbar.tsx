"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const MessageNavbar = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const { data: session } = useSession();
  return (
    <div className="h-16 border-b-2 border-slate-600 flex justify-between items-center px-2">
      <div className=" flex items-center gap-2  ">
        <button
          onClick={() => setOpen(!open)}
          className="bg-rose-600 text-white sm:hidden block px-2 py-1 rounded-md"
        >
          Back
        </button>
        <Avatar src={session?.user.image} alt={session?.user.name} />
        <div className="-space-y-1">
          <p className="font-bold">{session?.user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageNavbar;

"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ChatUser = ({ setOpen, item }: { setOpen: any; item: any }) => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const router = useRouter();

  const onClickHandler = () => {
    setOpen(true);
    params.set(`converId`, item.id);

    if (item.sender.id === session?.user.id) {
      params.set(`userId`, item.receiver.id);
    } else {
      params.set(`userId`, item.sender.id);
    }

    router.push(`${pathname}?${params}`);
  };

  return (
    <React.Fragment>
      <div
        onClick={onClickHandler}
        className=" flex items-center gap-2  mt-2 hover:bg-slate-300 px-2 rounded-md cursor-pointer py-2"
      >
        <Avatar
          src={
            item.senderId === session?.user.id
              ? item.receiver?.image
              : item.sender?.image
          }
          alt={
            item.senderId === session?.user.id
              ? item.receiver?.userName
              : item.sender?.userName
          }
        />
        <div className="-space-y-1">
          <p className="font-bold">
            {item.senderId === session?.user.id
              ? item.receiver?.userName
              : item.sender?.userName}
          </p>
          {/* <p>hello</p> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatUser;

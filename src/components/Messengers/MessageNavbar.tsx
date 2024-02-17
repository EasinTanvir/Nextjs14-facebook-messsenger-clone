"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { findAllMessageAction } from "../../../serverAction/findConversationAction";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const MessageNavbar = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [activeChatDate, setActiveChstData] = useState<any>("");
  const fetchData = async () => {
    //setOpen(true);

    try {
      const { data } = await axios.get(`/api/user/${userId}`);
      const sendData = {
        id: data?.id,
        userName: data?.userName,
        image: data?.image,
      };
      setActiveChstData(sendData);
    } catch (err) {
      toast.error("SomeThing went wrong");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="h-16 border-b-2 border-slate-600 flex justify-between items-center px-2">
      <div className=" flex items-center gap-2  ">
        <Link
          href="/messenger"
          onClick={() => setOpen(!open)}
          className="bg-rose-600 text-white sm:hidden block px-2 py-1 rounded-md"
        >
          Back
        </Link>
        {userId ? (
          <>
            <Avatar src={activeChatDate?.image} alt={activeChatDate?.name} />
            <div className="-space-y-1">
              <p className="font-bold">{activeChatDate?.userName}</p>
            </div>
          </>
        ) : (
          <p className="text-rose-700 font-semibold">
            please select a conversation{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageNavbar;

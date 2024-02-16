"use client";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { findAllMessageAction } from "../../../serverAction/findConversationAction";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

const Receiver = ({ item }: { item: any }) => {
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
    <div className="flex justify-start">
      <div className=" flex  items-start gap-2 lg:max-w-[50%] w-full   px-2 rounded-md  py-2">
        <Avatar src={activeChatDate?.image} alt={activeChatDate?.userName} />
        <div className="bg-slate-300 px-4 py-4 rounded-md ">
          <p style={{ fontSize: "14px" }} className=" ">
            {item.text}
          </p>
          <p style={{ fontSize: "12px" }} className="mt-1 ">
            {moment(item.time).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receiver;

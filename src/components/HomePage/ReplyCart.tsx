import { Avatar } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import AddNewReply from "./AddNewReply";

const ReplyCart = ({ item }: { item: any }) => {
  const [replyBox, setReplyBox] = useState(false);
  return (
    <div className="ms-12 mt-2">
      <div className="flex items-start   gap-1 ">
        <div className="">
          <Avatar alt={item?.user.userName} src={item?.user.image} />
        </div>
        <div className="bg-slate-300 w-full  py-1 px-4 rounded-md ">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{item?.user.userName}</h3>
            <span style={{ fontSize: "13px" }}>
              {" "}
              {moment(item?.createAt).fromNow()}
            </span>
          </div>
          <h3 className="text-sm">{item.text}</h3>
          <button className="font-semibold text-sm">reply</button>
        </div>
      </div>
    </div>
  );
};

export default ReplyCart;

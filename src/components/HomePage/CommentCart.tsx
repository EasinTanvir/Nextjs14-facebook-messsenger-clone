import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import ReplyCart from "./ReplyCart";
import AddNewReply from "./AddNewReply";

const CommentCart = ({
  item,
  userId,
  postId,
}: {
  item: any;
  userId: any;
  postId: any;
}) => {
  const [replyBox, setReplyBox] = useState(false);

  return (
    <div>
      <div className="flex items-start   gap-1 ">
        <div className="">
          <Avatar alt={item?.User.userName} src={item?.User.image} />
        </div>
        <div className="bg-slate-300 w-full  py-1 px-4 rounded-md ">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold">{item?.User.userName}</h3>
            <span style={{ fontSize: "13px" }}>
              {" "}
              {moment(item?.createAt).fromNow()}
            </span>
          </div>
          <h3 className="text-sm">{item.comment}</h3>
          <button
            onClick={() => setReplyBox(true)}
            className="font-semibold text-sm"
          >
            reply
          </button>
        </div>
      </div>

      {item?.reply?.map((item: any) => (
        <ReplyCart key={item.id} item={item} />
      ))}
      {replyBox && <AddNewReply id={item.id} />}
    </div>
  );
};

export default CommentCart;

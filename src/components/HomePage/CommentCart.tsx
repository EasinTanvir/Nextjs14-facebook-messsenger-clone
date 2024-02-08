import React from "react";
import Avatar from "@mui/material/Avatar";
import moment from "moment";

const CommentCart = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center   gap-1 ">
      <div className="">
        <Avatar alt={item?.User.userName} src={item?.User.image} />
      </div>
      <div className="bg-slate-300 w-full  py-1 px-4 rounded-md ">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">{item?.User.userName}</h3>
          <span>{moment(item?.createAt).fromNow()}</span>
        </div>
        <h3 className="text-sm">{item.comment}</h3>
      </div>
    </div>
  );
};

export default CommentCart;

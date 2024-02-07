"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AddNewComment from "./AddNewComment";
import { useFormState } from "react-dom";
import { createLikeAction } from "../../../serverAction/likePost";
import LikeButton from "./LikeButton";
const UpdatePost = ({
  id,
  like,
  comment,
}: {
  id: string;
  like: any;
  comment: any;
}) => {
  const [openComment, setOpentComment] = useState(false);
  // @ts-expect-error
  const [state, action] = useFormState(createLikeAction, {
    message: null,
  });
  console.log(comment);
  return (
    <>
      <div className="flex justify-between items-end mt-3">
        <form action={action}>
          <input name="postId" type="hidden" value={id} />

          <LikeButton like={like} />
        </form>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setOpentComment(true)}
            className="font-semibold"
          >
            Comment
          </button>
        </div>
      </div>

      <>{openComment && <AddNewComment id={id} />}</>

      <div className="mt-3 space-y-3">
        {comment.map((item: any) => (
          <div className="flex items-center   gap-1 ">
            <div className="">
              <Avatar alt={item?.User.userName} src={item?.User.image} />
            </div>
            <div className="bg-slate-300 w-full  py-1 px-4 rounded-md ">
              <h3 className="font-semibold">{item?.User.userName}</h3>
              <h3 className="text-sm">{item.comment}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdatePost;

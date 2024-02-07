"use client";
import { useState } from "react";

import AddNewComment from "./AddNewComment";
import { useFormState } from "react-dom";
import { createLikeAction } from "../../../serverAction/likePost";
import LikeButton from "./LikeButton";
const UpdatePost = ({ id, like }: { id: string; like: any }) => {
  const [openComment, setOpentComment] = useState(false);
  // @ts-expect-error
  const [state, action] = useFormState(createLikeAction, {
    message: null,
  });

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

      <>{openComment && <AddNewComment />}</>
    </>
  );
};

export default UpdatePost;

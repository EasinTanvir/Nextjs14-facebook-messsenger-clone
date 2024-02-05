"use client";
import { useState } from "react";

import AddNewComment from "./AddNewComment";
const UpdatePost = () => {
  const [openComment, setOpentComment] = useState(false);
  return (
    <>
      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2 items-center">
          <button className="font-semibold cursor-pointer">Like</button>
        </div>
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

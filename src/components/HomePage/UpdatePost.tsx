"use client";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
const UpdatePost = () => {
  return (
    <div className="flex justify-between items-end mt-4">
      <div className="flex gap-2 items-center">
        <button className="font-semibold cursor-pointer">Like</button>
      </div>
      <div className="flex gap-2 items-center">
        <button className="font-semibold">Comment</button>
      </div>
    </div>
  );
};

export default UpdatePost;

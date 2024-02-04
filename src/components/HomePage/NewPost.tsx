"use client";
import { IoMdPhotos } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
const NewPost = () => {
  return (
    <div className="min-h-[100px] sm:max-w-[600px] max-w-[400px] flex flex-col gap-4 p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <input
            type="text"
            className="w-full py-2 rounded-md px-4 outline-none  shadow-lg shadow-slate-400"
            placeholder="whats on your mind Easin?"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ms-14">
        <button>
          <IoMdPhotos size={30} />
        </button>
        <span>Photos</span>
      </div>
    </div>
  );
};

export default NewPost;

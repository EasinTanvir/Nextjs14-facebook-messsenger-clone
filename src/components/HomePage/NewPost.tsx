"use client";
import { IoMdPhotos } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AddNewPostModal from "./AddNewPostModal";
import { useState } from "react";
const NewPost = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-[100px] sm:max-w-[600px] max-w-[400px] flex flex-col gap-4 p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className="flex items-center gap-5">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <button
            onClick={() => setOpen(true)}
            className="h-10 rounded-md text-start px-4 text-md bg-slate-300 w-full"
          >
            Whats on your mind ?
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 ms-14">
        <button>
          <IoMdPhotos size={30} />
        </button>
        <span>Photos</span>
      </div>
      <AddNewPostModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default NewPost;

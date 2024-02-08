"use client";
import { IoMdPhotos } from "react-icons/io";

import AddNewPostModal from "./AddNewPostModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";

const NewPost = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-[100px] sm:max-w-[600px] max-w-[400px] flex flex-col gap-4 p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className="flex items-center gap-5">
        <Avatar src={session?.user.image} alt={session?.user.name} />
        <div className="flex-1">
          <button
            onClick={() => setOpen(true)}
            className="h-10 rounded-md text-start px-4 text-md bg-slate-300 w-full"
          >
            {`Whats on your mind, ${session?.user.name}?`}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 ms-14">
        <button onClick={() => setOpen(true)}>
          <IoMdPhotos size={30} />
        </button>
        <span>Photos</span>
      </div>
      <AddNewPostModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default NewPost;

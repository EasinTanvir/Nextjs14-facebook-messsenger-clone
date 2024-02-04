import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import UpdatePost from "./UpdatePost";
const Card = () => {
  return (
    <div className="min-h-[450px] sm:max-w-[600px] max-w-[400px] flex flex-col p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className=" flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="-space-y-7">
          <p className="font-bold">Easin</p>
          <span className="text-sm">3 hours ago</span>
        </div>
      </div>
      <div className="relative w-full sm:h-[450px] h-[250px] my-3">
        <Image
          className="object-cover"
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          fill
        />
      </div>
      <div className="h-10 border border-slate-200 w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <BiSolidLike />
          <span className="font-semibold">10</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaComment />
          <span className="font-semibold">5</span>
        </div>
      </div>
      <UpdatePost />
    </div>
  );
};

export default Card;

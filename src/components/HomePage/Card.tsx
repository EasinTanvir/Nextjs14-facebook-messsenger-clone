import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import UpdatePost from "./UpdatePost";
import { Posts } from "../../../types/post";
import { getServerCredentials } from "../../../actions/sersverSession";
import moment from "moment";
const Card = async ({
  id,
  caption,
  image,
  mode,
  time,
  userId,
  user,
  like,
  comment,
}: any) => {
  return (
    <div className="min-h-[450px] sm:max-w-[600px] max-w-[400px] flex flex-col p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className=" flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image} alt="@shadcn" />
          <AvatarFallback>{user?.userName}</AvatarFallback>
        </Avatar>
        <div className="-space-y-7">
          <p className="font-bold">{user?.userName}</p>
          <span className="text-sm"> {moment(time).fromNow()} </span>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="">{caption}</h3>
      </div>
      <div className="relative w-full sm:h-[450px] h-[250px] my-1">
        <Image
          priority
          className="object-cover"
          src={image}
          alt={caption}
          fill
        />
      </div>
      <div className="h-10 border border-slate-200 w-full flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <BiSolidLike />

          <span className="font-semibold">{like.length}</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaComment />
          <span className="font-semibold">5</span>
        </div>
      </div>

      <UpdatePost id={id} like={like} comment={comment} />
    </div>
  );
};

export default Card;

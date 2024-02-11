import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface Props {
  id: string;
  userName: string;
  email: string;
  image: string;
}

const Chat = ({ items }: { items: any }) => {
  return (
    <div className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-md">
      <Avatar>
        <AvatarImage src={items?.image} alt="@shadcn" />
        <AvatarFallback>{items?.userName}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold">{items?.userName}</p>
        <button className="bg-rose-800 text-white px-2 py-1 rounded text-sm">
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default Chat;

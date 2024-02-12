"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createFriendAction } from "../../../serverAction/createFriendAction";
import { useFormState } from "react-dom";
import AddFriendButton from "./AddFriendButton";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Chat = ({ items }: { items: any }) => {
  //@ts-ignore
  const [state, action] = useFormState(createFriendAction, { message: null });

  useEffect(() => {
    if (state?.message) {
      toast.success(state?.message);
    }
  }, [state]);

  return (
    <div className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-md">
      <Avatar>
        <AvatarImage src={items?.image} alt="@shadcn" />
        <AvatarFallback>{items?.userName}</AvatarFallback>
      </Avatar>
      <form action={action}>
        <input type="hidden" name="userId" id="" value={items?.id} />
        <p className="font-bold">{items?.userName}</p>
        <AddFriendButton />
      </form>
    </div>
  );
};

export default Chat;

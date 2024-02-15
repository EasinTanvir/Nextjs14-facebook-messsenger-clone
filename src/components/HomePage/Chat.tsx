"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import AddFriendButton from "./AddFriendButton";

import toast from "react-hot-toast";
import { reqForFriendAction } from "../../../serverAction/frndReqNotifyActions";

const Chat = ({ items }: { items: any }) => {
  async function clientAction(formData: FormData) {
    const result = await reqForFriendAction(formData);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Friend request sent");
    }
  }

  return (
    <div className=" flex items-center gap-2 cursor-pointer hover:bg-slate-200 py-2 px-4 rounded-md">
      <Avatar>
        <AvatarImage src={items?.image} alt="@shadcn" />
        <AvatarFallback>{items?.userName}</AvatarFallback>
      </Avatar>
      <form action={clientAction}>
        <input type="hidden" name="userId" id="" value={items?.id} />
        <p className="font-bold">{items?.userName}</p>
        <AddFriendButton />
      </form>
    </div>
  );
};

export default Chat;

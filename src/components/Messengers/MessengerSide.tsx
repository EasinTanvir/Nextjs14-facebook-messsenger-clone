import React from "react";
import ChatUser from "./ChatUser";
import { fetchConversation } from "../../../actions/fetchConversation";

const MessengerSide = async ({
  open,
  setOpen,
}: {
  open: any;
  setOpen: any;
}) => {
  return (
    <div
      className={`sm:w-[300px] ${
        open ? "sm:block hidden w-full" : "w-full"
      } max-h-full overflow-y-auto border py-4 px-3`}
    >
      <h1 className="font-semibold text-lg">Start Chat With your friends</h1>
      <ChatUser setOpen={setOpen} />
    </div>
  );
};

export default MessengerSide;

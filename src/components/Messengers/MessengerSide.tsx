import React from "react";
import ChatUser from "./ChatUser";

const MessengerSide = async ({
  open,
  setOpen,
  conver,
}: {
  open: any;
  setOpen: any;
  conver: any;
}) => {
  return (
    <div
      className={`sm:w-[300px] ${
        open ? "sm:block hidden w-full" : "w-full"
      } max-h-full overflow-y-auto border py-4 px-3`}
    >
      {conver.length > 0 && (
        <h1 className="font-semibold text-lg">Start Chat With your friends</h1>
      )}
      {conver.length === 0 ? (
        <p className="font-semibold text-lg text-rose-900">
          Please add friend to start chat
        </p>
      ) : (
        conver.map((item: any) => (
          <ChatUser key={item.id} setOpen={setOpen} item={item} />
        ))
      )}
    </div>
  );
};

export default MessengerSide;

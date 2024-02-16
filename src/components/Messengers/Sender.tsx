"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const Sender = ({ item }: { item: any }) => {
  const { data: session } = useSession();
  return (
    <React.Fragment>
      <div className="flex justify-end">
        <div className=" flex flex-row-reverse items-start gap-2 lg:max-w-[50%] w-full   px-2 rounded-md  py-2">
          <Avatar src={session?.user.image} alt={session?.user.name} />
          <div className="">
            <p className="bg-slate-300 px-4 py-4 rounded-md text-sm">
              {item.text}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sender;

"use client";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

const Receiver = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-start">
      <div className=" flex  items-start gap-2 lg:max-w-[50%] w-full   px-2 rounded-md  py-2">
        <Avatar src={session?.user.image} alt={session?.user.name} />
        <div className="">
          <p className="bg-slate-300 px-4 py-4 rounded-md text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In cum
            esse sed facere nulla molestiae? Dignissimos delectus sed quaerat
            hic, veniam quo eaque et fugit reprehenderit doloribus deserunt.
            Veniam harum illo sint neque aspernatur recusandae molestiae tempora
            illum exercitationem architecto.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receiver;

import React from "react";
import Chat from "./Chat";
import { fetchAllUsers, fetchUser } from "../../../actions/fetchPost";

const RightSideBar = async () => {
  const user = await fetchAllUsers();

  return (
    <div className="max-w-64 min-w-64 py-4 lg:flex hidden flex-col gap-6 items-center border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div>
        <h1 className="font-semibold ms-2">Make Friends to start Chat</h1>
      </div>
      {user.map((item) => (
        <Chat items={item} />
      ))}
    </div>
  );
};

export default RightSideBar;

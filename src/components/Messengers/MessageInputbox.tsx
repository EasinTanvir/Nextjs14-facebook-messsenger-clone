import React from "react";

import { IoMdSend } from "react-icons/io";
const MessageInputbox = () => {
  return (
    <div className="flex flex-row justify-between  relative  ">
      <input
        type="text"
        name=""
        placeholder="type your message"
        id=""
        className="border border-slate-600 py-2 w-full px-2 rounded-md outline-none"
      />
      <button className="absolute right-2 top-0 bottom-0 m-auto">
        <IoMdSend size={24} />
      </button>
    </div>
  );
};

export default MessageInputbox;

import React from "react";
import { SideBarItems } from "@/utils/listItem";

const SideBar = () => {
  return (
    <div className="w-64 lg:flex hidden flex-col gap-6 py-6 px-4 border h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      {SideBarItems.map((item) => (
        <p
          className="flex gap-2 items-center hover:bg-slate-300 py-2 px-2 rounded-md cursor-pointer"
          key={item.id}
        >
          <item.Icon size={25} />
          <span>{item.label}</span>
        </p>
      ))}
    </div>
  );
};

export default SideBar;

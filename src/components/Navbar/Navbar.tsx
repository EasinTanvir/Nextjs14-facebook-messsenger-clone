"use client";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { ListItesm } from "@/utils/listItem";

import { ImCross } from "react-icons/im";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavbarIcon from "./NavbarIcon";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white sticky top-0 h-16 w-full shadow-md shadow-slate-300 z-50 ">
      <nav className="flex justify-between h-full  items-center mx-4">
        <div className="flex flex-1  gap-4">
          <FaFacebook size={40} />
          <input
            className=" bg-slate-200 rounded-lg    sm:w-60 w-44 px-4 outline-none"
            type="text"
            name=""
            placeholder="Search here"
            id=""
          />
          <button onClick={() => setOpen(!open)} className="mid:hidden block  ">
            {open ? <ImCross size={20} /> : <IoMdMenu size={25} />}
          </button>
        </div>

        <ul
          className={`flex mid:flex-row flex-col  rounded-sm shadow-md  shadow-fuchsia-100 mid:static duration-200 absolute left-0  w-full ${
            open ? "h-72 py-4" : "mid:h-fit h-0"
          }  mid:bg-white  bg-slate-600 top-16  flex-1  overflow-hidden   mid:justify-between `}
        >
          {ListItesm.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={item.href}>
                    <li className="cursor-pointer w-fit text-white mid:text-slate-600 h-fit p-4 flex gap-2 items-center justify-center transition rounded-full  mid:hover:bg-slate-300">
                      <item.Icon size={27} />
                      <span className="mid:hidden font-semibold">
                        {item.label}
                      </span>
                    </li>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="mid:table hidden">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>
        <>
          <NavbarIcon />
        </>
      </nav>
    </header>
  );
};

export default Navbar;

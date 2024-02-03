"use client";
import { FaFacebookMessenger } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NavbarIcon = () => {
  return (
    <div className="flex justify-end mlg:flex-1 w-36  gap-2  items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <li className="cursor-pointer w-fit h-fit p-2 flex items-center justify-center transition rounded-full hover:bg-slate-300">
              <FaFacebookMessenger size={27} />
            </li>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start Message With you Firiebds</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="cursor-pointer">CN</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavbarIcon;

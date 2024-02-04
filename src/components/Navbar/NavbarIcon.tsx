"use client";
import { FaFacebookMessenger } from "react-icons/fa";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavbarIcon = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };
  console.log(session);

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
            <Avatar
              alt={session?.user?.name || ""}
              src={session?.user?.image !== null ? session?.user?.image : ""}
            />
          </MenubarTrigger>
          <MenubarContent>
            {status === "unauthenticated" && (
              <>
                <MenubarSeparator />
                <Link href="/auth/signup">
                  <MenubarItem>Signup</MenubarItem>
                </Link>
              </>
            )}
            {status === "authenticated" && (
              <>
                <MenubarSeparator />
                <Link href="/user/profile">
                  <MenubarItem>Profile</MenubarItem>
                </Link>
              </>
            )}
            {status === "authenticated" && (
              <>
                <MenubarSeparator />
                <Link href="/messenger">
                  <MenubarItem>Messenger</MenubarItem>
                </Link>
              </>
            )}{" "}
            {status === "authenticated" && (
              <>
                <MenubarSeparator />
                <Link onClick={logoutHandler} href="/messenger">
                  <MenubarItem>LogOut</MenubarItem>
                </Link>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default NavbarIcon;

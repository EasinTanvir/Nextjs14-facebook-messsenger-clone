"use client";
import { FaFacebookMessenger } from "react-icons/fa";

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
import { IoIosLogIn } from "react-icons/io";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Tooltip } from "@mui/material";
import { profileItems } from "@/utils/listItem";
import React from "react";

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
      <Tooltip title="Start Chat With your friends">
        <li className="cursor-pointer w-fit h-fit p-2 flex items-center justify-center transition rounded-full hover:bg-slate-300">
          <FaFacebookMessenger size={27} />
        </li>
      </Tooltip>

      {status === "unauthenticated" && (
        <Tooltip title="Sign In to start Chat  with your friends">
          <Button
            onClick={() => router.push("/auth/signin")}
            variant="outlined"
            endIcon={<IoIosLogIn />}
          >
            SignIn
          </Button>
        </Tooltip>
      )}

      {status === "authenticated" && (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <Avatar
                alt={session?.user?.name || ""}
                src={session?.user?.image !== null ? session?.user?.image : ""}
              />
            </MenubarTrigger>
            <MenubarContent>
              {profileItems.map((item) => (
                <React.Fragment key={item.id}>
                  <MenubarSeparator />
                  <Link href={item.href}>
                    <MenubarItem>{item.label}</MenubarItem>
                  </Link>
                </React.Fragment>
              ))}

              <>
                <MenubarSeparator />
                <Link onClick={logoutHandler} href="/messenger">
                  <MenubarItem>LogOut</MenubarItem>
                </Link>
              </>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </div>
  );
};

export default NavbarIcon;

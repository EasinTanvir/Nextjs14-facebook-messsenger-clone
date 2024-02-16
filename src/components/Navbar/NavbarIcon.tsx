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
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Tooltip } from "@mui/material";
import { profileItems } from "@/utils/listItem";
import React, { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";

import axios from "axios";
import FriendReqListModal from "../FriendReqListModal";

const NavbarIcon = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [notification, setNotification] = useState([]);
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  useEffect(() => {
    const channel = pusherClient.subscribe(`${session?.user.id}`);
    channel.bind("message", function (data: any) {
      //@ts-ignore
      setNotification((prev) => [...prev, data]);
    });

    return () => {
      pusherClient.unsubscribe(`${session?.user.id}`);
    };
  }, [session?.user.id]);

  const fetchClientUser = async () => {
    try {
      const { data } = await axios.get(`/api/user/${session?.user.id}`);

      let array = data?.message?.notification;
      let reversedArray = array.slice().reverse();

      setNotification(reversedArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session?.user.id && status === "authenticated") {
      fetchClientUser();
    }
  }, [session?.user.id]);

  const onFriendModalHandler = (id: string) => {
    setOpen(true);
    setUserId(id);
  };

  return (
    <div className="flex justify-end md:flex-1 w-36  sm:gap-2  items-center">
      <Tooltip title="Start Chat With your friends">
        <li className="cursor-pointer w-fit h-fit p-2 flex items-center justify-center transition rounded-full hover:bg-slate-300">
          <FaFacebookMessenger size={27} />
        </li>
      </Tooltip>

      <li className="cursor-pointer w-fit h-fit p-0 flex items-center justify-center transition rounded-full hover:bg-slate-300">
        <div className="p-1 relative">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <IoIosNotifications size={27} />
              </MenubarTrigger>
              <MenubarContent className="px-6 py-4">
                <ul className="space-y-4">
                  {notification.length === 0 || status === "unauthenticated" ? (
                    <div className="h-10 flex justify-center items-center">
                      <p className="font-semibold text-rose-700">
                        You have no norification
                      </p>
                    </div>
                  ) : (
                    <>
                      {notification.map((item: any, i) => (
                        <>
                          <div className=" flex items-center gap-2">
                            <Avatar src={item?.image} alt={item?.name} />
                            <div className="-space-y-7">
                              <Link
                                className="hover:underline"
                                href={`/user/profile/${item?.userId}`}
                              >
                                <p className="font-bold">{item?.name}</p>
                              </Link>
                              <span className="text-sm">
                                <span>{item?.message}</span>
                                {item?.message ===
                                  "has sent you a friend req" ||
                                "has accepted friend req" ? (
                                  <button
                                    onClick={() =>
                                      onFriendModalHandler(item?.userId)
                                    }
                                    className="ms-2 bg-rose-700 text-white px-2 py-1 rounded-md  "
                                  >
                                    Show
                                  </button>
                                ) : (
                                  <Link
                                    href={`/post/${item.postId}`}
                                    className="ms-2 bg-rose-700 text-white px-2 py-1 rounded-md  "
                                  >
                                    view
                                  </Link>
                                )}
                              </span>
                            </div>
                          </div>
                          <MenubarSeparator />
                        </>
                      ))}
                    </>
                  )}
                </ul>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="absolute -right-1 top-0 w-5 h-5 rounded-full bg-rose-900 text-white flex justify-center items-center">
            {notification.length}
          </div>
        </div>
      </li>

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
              <MenubarItem>{session?.user?.name}</MenubarItem>
              {profileItems.map((item) => (
                <React.Fragment key={item.id}>
                  <MenubarSeparator />
                  <Link
                    href={
                      item.href === "/user/profile"
                        ? `${item.href}/${session.user.id}`
                        : item.href
                    }
                  >
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
      <FriendReqListModal open={open} userId={userId} setOpen={setOpen} />
    </div>
  );
};

export default NavbarIcon;

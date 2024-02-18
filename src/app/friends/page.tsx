import React from "react";
import { getServerCredentials } from "../../../actions/sersverSession";
import { fetchAllUsers } from "../../../actions/fetchPost";
import Chat from "@/components/HomePage/Chat";
import { redirect } from "next/navigation";

const page = async () => {
  let user;

  const my = await getServerCredentials();
  if (my?.user) {
    user = await fetchAllUsers();
  } else {
    redirect("/api/auth/signin");
  }
  return (
    <div className="p-4">
      {" "}
      {my && user?.map((item) => <Chat key={item.id} items={item} />)}
    </div>
  );
};

export default page;

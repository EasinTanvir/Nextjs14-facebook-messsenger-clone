import Messengers from "@/components/Messengers";
import React from "react";
import { fetchConversation } from "../../../actions/fetchConversation";
import { getServerCredentials } from "../../../actions/sersverSession";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerCredentials();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const conver = await fetchConversation();

  return <Messengers conver={conver} />;
};

export default page;

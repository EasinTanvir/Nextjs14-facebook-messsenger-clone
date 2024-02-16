import Messengers from "@/components/Messengers";
import React from "react";
import { fetchConversation } from "../../../actions/fetchConversation";

const page = async () => {
  const conver = await fetchConversation();

  return <Messengers conver={conver} />;
};

export default page;

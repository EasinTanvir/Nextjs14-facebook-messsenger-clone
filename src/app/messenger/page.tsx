import Messengers from "@/components/Messengers";
import React, { Suspense } from "react";
import { fetchConversation } from "../../../actions/fetchConversation";
import { getServerCredentials } from "../../../actions/sersverSession";
import { redirect } from "next/navigation";
import { SkeletonCard } from "@/components/Extra";

const page = async () => {
  const session = await getServerCredentials();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const conver = await fetchConversation();

  return (
    <Suspense fallback={<SkeletonCard />}>
      <Messengers conver={conver} />
    </Suspense>
  );
};

export default page;

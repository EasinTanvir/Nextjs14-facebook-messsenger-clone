import HomePage from "@/components/HomePage";
import React from "react";

import { fetchPost } from "../../actions/fetchPost";
import { fetchConversation } from "../../actions/fetchConversation";

const page = async () => {
  const posts = await fetchPost();

  return (
    <>
      <HomePage posts={posts} />
    </>
  );
};

export default page;

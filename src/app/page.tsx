import HomePage from "@/components/HomePage";
import React from "react";

import { fetchPost } from "../../actions/fetchPost";

const page = async () => {
  const posts = await fetchPost();
  //console.log(posts);

  return (
    <>
      <HomePage posts={posts} />
    </>
  );
};

export default page;

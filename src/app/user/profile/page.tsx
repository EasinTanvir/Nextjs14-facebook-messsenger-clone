import HomePage from "@/components/HomePage";
import ProfilePage from "@/components/ProfilePage";
import React from "react";
import { fetchMyPost } from "../../../../actions/fetchPost";

const page = async () => {
  const posts = await fetchMyPost();

  return (
    <>
      <ProfilePage posts={posts} />
    </>
  );
};

export default page;

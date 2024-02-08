import ProfilePage from "@/components/ProfilePage";
import React from "react";
import { fetchMyPost, fetchUser } from "../../../../../actions/fetchPost";

interface Props {
  params: { uid: string };
}

const page = async ({ params: { uid } }: Props) => {
  const posts = await fetchMyPost(uid);
  const user = await fetchUser(uid);

  return (
    <>
      <ProfilePage posts={posts} user={user} />
    </>
  );
};

export default page;

import HomePage from "@/components/HomePage";
import React from "react";
import { fetchPostbyId } from "../../../../actions/fetchPost";
interface Props {
  params: { pid: string };
}
const page = async ({ params: { pid } }: Props) => {
  const posts = await fetchPostbyId(pid);

  return (
    <>
      <HomePage posts={posts} single={true} />
    </>
  );
};

export default page;

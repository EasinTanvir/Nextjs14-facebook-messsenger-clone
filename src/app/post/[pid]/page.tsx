import HomePage from "@/components/HomePage";
import React from "react";
import { fetchPostbyId } from "../../../../actions/fetchPost";
interface Props {
  params: { pid: string };
}
const page = async ({ params: { pid } }: Props) => {
  return (
    <>
      <HomePage pid={pid} single={true} />
    </>
  );
};

export default page;

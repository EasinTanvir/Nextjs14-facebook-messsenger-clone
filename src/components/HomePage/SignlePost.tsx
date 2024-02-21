import React, { Suspense } from "react";
import Card from "./Card";
import { fetchPost, fetchPostbyId } from "../../../actions/fetchPost";
import { SkeletonCard } from "../Extra";

async function FetchData({ pid }: { pid: string }) {
  const post = await fetchPostbyId(pid);

  return (
    <>
      <Card {...post} />
    </>
  );
}

const SignlePost = ({ pid }: any) => {
  return (
    <div className="border flex flex-col gap-10 items-center flex-1 py-4">
      <Suspense fallback={<SkeletonCard />}>
        <FetchData pid={pid} />
      </Suspense>
    </div>
  );
};

export default SignlePost;

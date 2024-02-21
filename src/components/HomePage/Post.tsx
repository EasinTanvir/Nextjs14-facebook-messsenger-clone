import React, { Suspense } from "react";
import Card from "./Card";
import NewPost from "./NewPost";

import { SkeletonCard } from "../Extra";
import { fetchPost } from "../../../actions/fetchPost";

async function FetchData() {
  const posts = await fetchPost();

  return (
    <>
      {posts.map((item: any) => (
        <Card key={item.id} {...item} />
      ))}
    </>
  );
}

const Post = ({ single = false }: any) => {
  return (
    <div className="border flex flex-col gap-10 items-center flex-1 py-4">
      <NewPost />
      <Suspense fallback={<SkeletonCard />}>
        <FetchData />
      </Suspense>
    </div>
  );
};

export default Post;

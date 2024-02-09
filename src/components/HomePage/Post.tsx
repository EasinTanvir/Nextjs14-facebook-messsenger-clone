import React from "react";
import Card from "./Card";
import NewPost from "./NewPost";

const Post = ({ posts, single = false }: any) => {
  return (
    <div className="border flex flex-col gap-10 items-center flex-1 py-4">
      <NewPost />

      {posts &&
        posts.length > 0 &&
        posts.map((item: any) => <Card key={item.id} {...item} />)}
    </div>
  );
};

export default Post;

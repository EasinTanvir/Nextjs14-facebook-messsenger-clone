import React from "react";
import Card from "./Card";
import NewPost from "./NewPost";

const Post = () => {
  return (
    <div className="border flex flex-col gap-10 items-center flex-1 py-4">
      <NewPost />
      <Card />
      <Card />
    </div>
  );
};

export default Post;

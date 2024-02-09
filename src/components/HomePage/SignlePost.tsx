import React from "react";
import Card from "./Card";

const SignlePost = ({ post }: any) => {
  return (
    <div className="border flex flex-col gap-10 items-center flex-1 py-4">
      <Card {...post} />
    </div>
  );
};

export default SignlePost;

import React from "react";
import SideBar from "./SideBar";
import Post from "./Post";
import RightSideBar from "./RightSideBar";
import SignlePost from "./SignlePost";

const HomePage = ({ posts, single = false }: any) => {
  return (
    <div className="flex justify-between relative">
      <SideBar />
      {single ? <SignlePost post={posts} /> : <Post posts={posts} />}

      <RightSideBar />
    </div>
  );
};

export default HomePage;

import React from "react";
import SideBar from "./SideBar";
import Post from "./Post";
import RightSideBar from "./RightSideBar";

const HomePage = ({ posts }: any) => {
  return (
    <div className="flex justify-between relative">
      <SideBar />
      <Post posts={posts} />

      <RightSideBar />
    </div>
  );
};

export default HomePage;

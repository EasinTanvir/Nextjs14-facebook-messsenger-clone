import React from "react";
import SideBar from "./SideBar";
import Post from "./Post";
import RightSideBar from "./RightSideBar";

const HomePage = () => {
  return (
    <div className="flex justify-between relative">
      <SideBar />

      <Post />

      <RightSideBar />
    </div>
  );
};

export default HomePage;

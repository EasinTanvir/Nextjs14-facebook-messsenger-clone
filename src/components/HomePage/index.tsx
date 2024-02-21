import React from "react";
import SideBar from "./SideBar";
import Post from "./Post";
import RightSideBar from "./RightSideBar";
import SignlePost from "./SignlePost";

const HomePage = ({ pid, single = false }: any) => {
  return (
    <div className="flex justify-between relative">
      <SideBar />
      {single ? <SignlePost pid={pid} /> : <Post />}

      <RightSideBar />
    </div>
  );
};

export default HomePage;

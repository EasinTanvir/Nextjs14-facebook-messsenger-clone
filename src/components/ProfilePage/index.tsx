import React from "react";
import MainProfile from "./MainProfile";
import SideBar from "../HomePage/SideBar";
import RightSideBar from "../HomePage/RightSideBar";

const ProfilePage = ({ posts, user, uid }: any) => {
  return (
    <div>
      <div className="flex justify-between relative">
        <SideBar />

        <MainProfile posts={posts} user={user} uid={uid} />

        <RightSideBar />
      </div>
    </div>
  );
};

export default ProfilePage;

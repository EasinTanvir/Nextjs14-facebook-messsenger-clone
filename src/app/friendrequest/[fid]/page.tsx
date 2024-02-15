import FriendReqist from "@/components/FriendList/FriendReqist";
import React from "react";

interface Props {
  params: {
    fid: string;
  };
}

const FrienRequest = ({ params: { fid } }: Props) => {
  return (
    <>
      <FriendReqist />
    </>
  );
};

export default FrienRequest;

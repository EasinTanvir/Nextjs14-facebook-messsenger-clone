import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

import { IoSendSharp } from "react-icons/io5";
const AddFriendButton = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="font-semibold">
      {pending ? "Loading...." : "Add Friend"}
    </button>
  );
};

export default AddFriendButton;

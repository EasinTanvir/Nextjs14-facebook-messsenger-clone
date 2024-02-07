import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

import { IoSendSharp } from "react-icons/io5";
const CommentButton = ({ setData }: { setData: any }) => {
  const { pending, action } = useFormStatus();

  useEffect(() => {
    if (!pending) {
      setData("");
    }
  }, [pending]);
  return (
    <button disabled={pending} className="font-semibold">
      {pending ? "Loading...." : <IoSendSharp size={20} />}
    </button>
  );
};

export default CommentButton;

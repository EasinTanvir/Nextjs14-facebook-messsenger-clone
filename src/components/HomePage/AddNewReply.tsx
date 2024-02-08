import React, { useEffect, useState } from "react";
import { createCommentAction } from "../../../serverAction/commentAction";
import { useFormState } from "react-dom";
import CommentButton from "./CommentButton";
import toast from "react-hot-toast";
import { createReplyAction } from "../../../serverAction/replyAction";

const AddNewReply = ({ id }: { id: string }) => {
  const [data, setData] = useState("");
  // @ts-expect-error
  const [state, action] = useFormState(createReplyAction, {
    message: null,
  });

  useEffect(() => {
    if (state && state.message === "Comment added successful") {
      toast.success(state?.message);
    }
    if (state?.message && state.message !== "Comment added successful") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form action={action} className="w-full mt-4 relative ps-12">
      <input type="hidden" name="commentId" value={id} />

      <input
        className="w-full py-2 rounded-full outline-none border border-slate-400 px-4"
        type="text"
        name="text"
        id=""
        required
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="reply to your friend"
      />
      <div className="absolute right-2  top-2">
        <CommentButton setData={setData} />
      </div>
    </form>
  );
};

export default AddNewReply;

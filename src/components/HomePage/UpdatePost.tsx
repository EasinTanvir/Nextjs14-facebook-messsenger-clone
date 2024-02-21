"use client";
import React, { useEffect, useState } from "react";
import AddNewComment from "./AddNewComment";
import { useFormState } from "react-dom";
import { createLikeAction } from "../../../serverAction/likePost";
import LikeButton from "./LikeButton";
import CommentCart from "./CommentCart";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
const UpdatePost = ({
  id,
  like,
  comment,
  userId,
}: {
  id: string;
  like: any;
  comment: any;
  userId: any;
}) => {
  const [openComment, setOpentComment] = useState(false);
  const { data: session, status } = useSession();

  const [viewMore, setViewMore] = useState<boolean>(false);
  const firstComment = comment?.slice(0, 2);

  return (
    <>
      {session && (
        <>
          <AddNewComment id={id} userId={userId} />
        </>
      )}
      {comment?.length > 0 && (
        <div className="mt-3 my-4 space-y-3 max-h-40  overflow-y-auto ">
          {viewMore ? (
            <React.Fragment>
              {comment?.map((item: any, id: number) => (
                <CommentCart key={id} item={item} userId={userId} postId={id} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {firstComment?.map((item: any, id: number) => (
                <CommentCart key={id} item={item} userId={userId} postId={id} />
              ))}
            </React.Fragment>
          )}
        </div>
      )}
      {comment?.length > 1 && (
        <div className="mt-4">
          <button
            onClick={() => setViewMore(!viewMore)}
            className="ms-11 font-semibold"
          >
            {!viewMore ? "View More..." : "Show Less"}
          </button>
        </div>
      )}
    </>
  );
};

export default UpdatePost;

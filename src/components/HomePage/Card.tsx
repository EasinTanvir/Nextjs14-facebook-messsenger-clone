"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import UpdatePost from "./UpdatePost";
import { Posts } from "../../../types/post";
import { getServerCredentials } from "../../../actions/sersverSession";
import moment from "moment";
import LikeButton from "./LikeButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { createLikeAction } from "../../../serverAction/likePost";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
const Card = async ({
  id,
  caption,
  image,
  mode,
  time,
  userId,
  user,
  like,
  comment,
}: any) => {
  // @ts-expect-error
  const [state, action] = useFormState(createLikeAction, {
    message: null,
  });
  const { data: session, status } = useSession();

  useEffect(() => {
    if (state && state.message === "you dislike this post") {
      toast.success(state?.message);
    }
    if (state && state.message === "you like this post") {
      toast.success(state?.message);
    }
    if (state?.message === "Something went wrong!") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <div className="h-auto sm:max-w-[600px] max-w-[400px] flex flex-col p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
      <div className=" flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image} alt="@shadcn" />
          <AvatarFallback>{user?.userName}</AvatarFallback>
        </Avatar>
        <div className="-space-y-7">
          <Link className="hover:underline" href={`/user/profile/${userId}`}>
            <p className="font-bold">{user?.userName}</p>
          </Link>
          <span className="text-sm"> {moment(time).fromNow()} </span>
        </div>
      </div>
      <div className="my-3">
        <h3 className={`${!image ? "text-xl font-semibold " : ""}`}>
          {caption}
        </h3>
      </div>
      {image && (
        <div className="relative w-full sm:h-[450px] h-[250px] my-1">
          <Image
            priority
            className="object-cover"
            src={image}
            alt={caption}
            fill
          />
        </div>
      )}
      <div className="h-10 border mt-2 border-slate-200 w-full flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <form action={action}>
            <input name="postId" type="hidden" value={id} />
            <input name="userId" type="hidden" value={userId} />

            <LikeButton like={like} />
          </form>

          <span className="font-semibold">{like?.length}</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaComment />
          <span className="font-semibold">{comment?.length}</span>
        </div>
      </div>

      {session && <UpdatePost id={id} like={like} comment={comment} />}
    </div>
  );
};

export default Card;

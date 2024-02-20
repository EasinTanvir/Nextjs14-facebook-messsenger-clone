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
import { useEffect, useState } from "react";
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
  likeUser,
}: any) => {
  const { data } = useSession();
  const [totalLike, setTotalLike] = useState<number>(like?.length);

  const { data: session, status } = useSession();

  const clientction = async (formData: FormData) => {
    if (data?.user.id) {
      const exist = like?.some((item: any) => item.userId === data?.user.id);
      if (exist) {
        toast.success("you dislike this post");
        setTotalLike((prev: number) => prev - 1);
      } else {
        toast.success("you like this post");
        setTotalLike((prev: number) => prev + 1);
      }
    }

    const { message, error } = await createLikeAction(formData);
    if (error) {
      toast.error(error!);
    }
  };

  return (
    <div className="h-auto sm:max-w-[600px] max-w-[355px] flex flex-col p-4  w-full border bg-white shadow-xl shadow-slate-400 rounded-md">
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
          <form action={clientction}>
            <input name="postId" type="hidden" value={id} />
            <input name="userId" type="hidden" value={userId} />

            <LikeButton like={like} />
          </form>

          <span className="font-semibold">{totalLike}</span>
        </div>
        <div className="flex gap-2 items-center">
          <FaComment />
          <span className="font-semibold">{comment?.length}</span>
        </div>
      </div>

      {session && (
        <UpdatePost id={id} like={like} comment={comment} userId={userId} />
      )}
    </div>
  );
};

export default Card;

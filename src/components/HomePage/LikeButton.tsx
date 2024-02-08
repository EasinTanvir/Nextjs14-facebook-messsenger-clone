import React from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LikeButton = ({ like }: { like: any }) => {
  const router = useRouter();
  const { data } = useSession();
  const exist = like?.some((item: any) => item.userId === data?.user.id);

  const { pending, action } = useFormStatus();

  const clickHandler = () => {
    if (data?.user.id) return;

    toast.error("Please login to start like and comment");
  };

  return (
    <button
      onClick={clickHandler}
      disabled={pending}
      className="font-semibold mt-1"
    >
      <>{exist ? <BiSolidLike size={20} /> : <AiOutlineLike size={20} />}</>
    </button>
  );
};

export default LikeButton;

import React from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";

const LikeButton = ({ like }: { like: any }) => {
  const { data } = useSession();
  const exist = like?.some((item: any) => item.userId === data?.user.id);

  const { pending, action } = useFormStatus();

  return (
    <button disabled={pending} className="font-semibold mt-1">
      {pending ? (
        "Loading...."
      ) : (
        <>{exist ? <BiSolidLike size={20} /> : <AiOutlineLike size={20} />}</>
      )}
    </button>
  );
};

export default LikeButton;

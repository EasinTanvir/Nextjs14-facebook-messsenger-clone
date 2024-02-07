import React from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";

const LikeButton = ({ like }: { like: any }) => {
  const { data } = useSession();
  const exist = like.some((item: any) => item.userId === data?.user.id);

  const { pending, action } = useFormStatus();

  return (
    <div>
      <button disabled={pending} className="font-semibold">
        {pending ? "Loading...." : <>{exist ? "Unlike" : "Like"}</>}
      </button>
    </div>
  );
};

export default LikeButton;

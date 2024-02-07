import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ postImageLoader }: { postImageLoader: boolean }) => {
  const { pending, action } = useFormStatus();

  return (
    <div>
      <button
        type="submit"
        className={`bg-teal-700 ${
          postImageLoader || pending ? "opacity-55" : "opacity-100"
        } px-4 py-2 rounded-md text-white hover:text-slate-300`}
      >
        {pending || postImageLoader ? "Loading" : "Publish"}
      </button>
    </div>
  );
};

export default SubmitButton;

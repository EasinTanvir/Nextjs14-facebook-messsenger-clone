import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";
import { ColorRing } from "react-loader-spinner";

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
        {pending ? (
          <ColorRing
            visible={true}
            height="24"
            width="50"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : (
          "Publish"
        )}
      </button>
    </div>
  );
};

export default SubmitButton;

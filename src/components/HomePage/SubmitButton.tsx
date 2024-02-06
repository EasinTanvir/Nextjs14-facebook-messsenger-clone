import { Button } from "@mui/material";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending, action } = useFormStatus();
  console.log(action);
  return (
    <div>
      <Button type="submit" variant="outlined">
        {pending ? "Loading" : "Publish"}
      </Button>
    </div>
  );
};

export default SubmitButton;

import * as React from "react";
import { ImCross } from "react-icons/im";
import Modal from "@mui/material/Modal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone";
import { Plus } from "lucide-react";
import { Button } from "@mui/material";
import { useFormState } from "react-dom";
import { createPostAction } from "../../../serverAction/createPostAction";
import SubmitButton from "./SubmitButton";
import firebaseUploadHandler from "@/utils/firebaseUploadHandler";
import toast from "react-hot-toast";
const AddNewPostModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [file, setFile] = React.useState<any>("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [postImage, setoPostImage] = React.useState("");
  const [postImageLoader, setoPostImageLoader] = React.useState(false);
  console.log(file.name);
  // @ts-expect-error
  const [state, action] = useFormState(createPostAction, { message: null });

  const onDrop = React.useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  });

  const onCancelHandler = () => {
    setFile(null);
  };

  React.useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader: any = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader?.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  React.useEffect(() => {
    if (!file) {
      return;
    }
    async function uploadFile() {
      setoPostImageLoader(true);
      const profileUrl: any = await firebaseUploadHandler(file);
      setoPostImage(profileUrl);
      setoPostImageLoader(false);
    }

    uploadFile();
  }, [file]);

  React.useEffect(() => {
    if (state.message !== null && state.message === "Success") {
      setOpen(false);
      toast.success("Create post Successfull");
    }
  }, [state]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="h-screen flex justify-center items-center">
        <form
          action={action}
          className="sm:w-[590px] w-[380px] relative bg-white rounded-lg p-4 min-h-[500px] shadow-lg shadow-slate-600"
        >
          <div className="absolute top-1 h-8 w-8  rounded-full bg-rose-700 right-1 flex justify-center items-center">
            <ImCross
              className="cursor-pointer text-white "
              onClick={() => setOpen(false)}
              size={18}
            />
          </div>
          <div className="space-y-2 mt-2">
            <div className="text-center">
              <h1 className="font-semibold text-2xl">Create Post</h1>
            </div>
            <hr />

            <React.Fragment>
              <div className=" flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-bold">Easin</p>
                  <select name="mode" id="">
                    <option value="PUBLIC" key="">
                      Public
                    </option>
                    <option value="PRIVATE" key="">
                      Private
                    </option>
                  </select>
                </div>
              </div>
            </React.Fragment>
            <input type="hidden" name="postimage" id="" value={postImage} />

            <React.Fragment>
              <div>
                <Textarea
                  name="caption"
                  placeholder="What's on your mind?"
                  maxLength={100}
                />
              </div>
            </React.Fragment>
            <React.Fragment>
              <div className="h-[220px]  mt-2">
                {!file || postImageLoader ? (
                  <div
                    {...getRootProps()}
                    className="border-2 mt-1 border-slate-400 py-2 px-8 w-full h-full flex justify-center items-center border-dashed cursor-pointer text-sm text-slate-400 "
                  >
                    {!postImageLoader ? (
                      <>
                        <input
                          accept=".png, .jpg, .jpeg"
                          name="image"
                          id="image"
                          {...getInputProps()}
                          type="file"
                        />
                        {isDragActive ? (
                          <p>Drop Here..... </p>
                        ) : (
                          <p className="flex items-center gap-2">
                            <Plus /> <span>Drop your profile pic here</span>
                          </p>
                        )}
                      </>
                    ) : (
                      <p>Loading.....</p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="w-full h-full relative">
                      <img
                        src={imageUrl}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute -top-10  right-0">
                        <button
                          type="button"
                          className="text-white bg-teal-700 px-2 py-1 rounded-md"
                          onClick={onCancelHandler}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </React.Fragment>

            <SubmitButton postImageLoader={postImageLoader} />
          </div>
          <p className="mt-2 text-rose-700">{state?.message}</p>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewPostModal;

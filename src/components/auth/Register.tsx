"use client";
import Link from "next/link";
import Inputs from "./Inputs";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { DropzoneState, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Plus } from "lucide-react";
import { firebaseStorage } from "@/utils/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseUploadHandler from "@/utils/firebaseUploadHandler";

const Register = () => {
  const router = useRouter();
  const [file, setFile] = useState<any>("");

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const {
    register,
    handleSubmit,
    setError,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { userName: "", email: "", password: "", image: "" },
  });

  const onSubmitHandler = async (data: any) => {
    let profileUrl;
    if (file) {
      try {
        profileUrl = await firebaseUploadHandler(file);
        data.image = profileUrl;
      } catch (err: any) {
        setError("root.serverError", { message: err });
      }
    }

    try {
      await axios.post("/api/auth/register", data);

      toast.success("Create user successful");
      router.push("/api/auth/signin");
    } catch (err: any) {
      if (err.response.data.email) {
        setError("email", { message: err.response.data.email });
      } else if (err.response.data.password) {
        setError("password", { message: err.response.data.password });
      } else {
        setError("root.serverError", { message: err.response.data.message });
      }
    }
  };

  const onCancelHandler = () => {
    setFile(null);
  };
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center ">
      <div className="sm:w-[550px] w-[400px] flex flex-col gap-3 p-5 shadow-md bg-slate-200 rounded-md">
        <div className="text-center ">
          <h1 className="font-semibold text-2xl">SignUp Now</h1>
        </div>
        <Inputs
          label="UserName*"
          type="text"
          required
          id="userName"
          errors={errors}
          register={register}
          message="UserName is required"
          placeholder="Type your UserName"
        />{" "}
        <Inputs
          label="Email*"
          type="email"
          required
          id="email"
          errors={errors}
          register={register}
          message="email is required"
          placeholder="Type your email"
        />
        <Inputs
          label="Password*"
          type="password"
          required
          id="password"
          errors={errors}
          register={register}
          message="password is required"
          placeholder="Type your password"
          minLength={6}
        />
        <div className="">
          <label className="font-semibold">Profile Picture</label>
          <div
            {...getRootProps()}
            className="border-2 mt-1 border-slate-400 py-2 px-8 w-fit border-dashed cursor-pointer text-sm text-slate-400 flex items-center"
          >
            {!file && (
              <>
                <input
                  {...getInputProps()}
                  type="file"
                  name="image"
                  accept=".jpg, .png, .jpeg"
                  id="image"
                />
                {isDragActive ? (
                  <p>Drop Here..... </p>
                ) : (
                  <p className="flex items-center gap-2">
                    <Plus /> <span>Drop your profile pic here</span>
                  </p>
                )}
              </>
            )}
            <>
              {file && (
                <div className="flex flex-row items-center gap-4 text-sm col-span-2">
                  <p>{file?.name}</p>
                  <div className="w-[70px]">
                    <button
                      className="bg-teal-700 text-white px-6 py-1 rounded-md"
                      onClick={onCancelHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
        <div className="text-start">
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:text-slate-400"
            onClick={handleSubmit(onSubmitHandler)}
          >
            {isSubmitting ? (
              <ColorRing
                visible={true}
                height="25"
                width="60"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            ) : (
              "Submit"
            )}
          </button>
        </div>
        {errors?.root?.serverError?.message && (
          <div>
            <p className="text-rose-800">
              {errors?.root?.serverError?.message}
            </p>
          </div>
        )}
        <div className="text-center">
          <p>
            Already have an account?
            <Link href="/api/auth/signin">
              <span className="font-semibold">SignIn</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";
import Link from "next/link";
import Inputs from "./Inputs";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [loadin, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmitHandler = (data: any) => {
    setLoading(true);

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((cb) => {
      if (cb?.ok) {
        setLoading(false);
        router.push("/");

        router.refresh();
        toast.success("Login Success");
      }
      if (cb?.error) {
        setLoading(false);
        toast.error(cb.error);
      }
    });
  };
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center ">
      <div className="sm:w-[550px] w-[400px] flex flex-col gap-3 px-5 py-9 shadow-md bg-slate-200 rounded-md">
        <div className="text-center mb-4">
          <h1 className="font-semibold text-3xl">SignIn Now</h1>
        </div>
        <Inputs
          label="Email"
          type="email"
          required
          id="email"
          errors={errors}
          register={register}
          message="email is required"
          placeholder="Type your email"
        />{" "}
        <Inputs
          label="Password"
          type="password"
          required
          id="password"
          errors={errors}
          register={register}
          message="password is required"
          placeholder="Type your password"
        />
        <div className="text-start">
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:text-slate-400"
            onClick={handleSubmit(onSubmitHandler)}
          >
            {loadin ? (
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
        <div className="text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">
              <span className="font-semibold">SignUp Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Input } from "../input";
import { Button } from "../button";
import { Eye, EyeSlash, TrendUp } from "iconsax-react";
import { useUser } from "@/context/user/user";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

export default function MobileSignIn() {
  const [password, setPassword] = useState(false);
  const { signIn, setIsLoggedIn } = useUser();
  const { push } = useRouter();
  function handlePassword() {
    setPassword(!password);
  }

  const formSchema = z.object({
    email: z.string().email({
      message: "Enter your email address",
    }),
    password: z.string().min(8, {
      message:
        "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
    }),
  });

  const { handleSubmit, reset, register, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: signIn,
    mutationKey: ["sign-in"],

    onSuccess() {
      toast.success("Successfully logged in");

      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      reset();
      push("/");
    },

    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <section className="lg:hidden block">
      <div className="flex w-full bg-white rounded-lg">
        <div className=" w-full p-10">
          <div
            onClick={() => push("/")}
            className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
          >
            <MoveLeft />
            <p>Go back</p>
          </div>
          <h1 className="text-2xl font-bold pb-6">Sign in to your account</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Email address
              </label>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="text-grayInactive w-full lg:min-w-[27rem] text-lg font-normal mt-2"
                {...register("email")}
              />
              {errors.email && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.email?.message}
                </div>
              )}
            </div>

            <div className="w-full lg:max-w-[27rem] relative">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <Input
                placeholder="Enter your password"
                type={password ? "password" : "text"}
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.password?.message}
                </div>
              )}
              <span
                onClick={handlePassword}
                className="absolute right-0 top-[53%]"
              >
                {password ? (
                  <EyeSlash size={32} className=" cursor-pointer pr-3" />
                ) : (
                  <Eye size={32} className=" cursor-pointer pr-3" />
                )}
              </span>
            </div>

            <div className="text-sm flex gap-1 mb-6">
              <p className="text-sm font-normal text-[#565D62]">
                Can’t remember your password?{" "}
                <span
                  onClick={() => push("/user-forgot-password")}
                  className="text-[#574DFF] cursor-pointer"
                >
                  Reset here
                </span>
              </p>
            </div>

            <Button
              type="submit"
              className=" lg:w-[300px] w-full"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-white font-medium text-xl">
                  <span>Signing in</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">Sign in</span>
              )}
            </Button>
          </form>
        </div>

        {/* <div className="rounded-r-lg hidden lg:block w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div> */}
      </div>
    </section>
  );
}

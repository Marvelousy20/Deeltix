"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { ISignIn, UserProfile } from "@/types";
import { useRouter } from "next/navigation";
import { cookieStorage } from "@ibnlanre/portal";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Eye, EyeSlash } from "iconsax-react";

export const RestaurantSignIn = () => {
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");
  const [isTyping, setIsTyping] = useState(false);

  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }

  const { push } = useRouter();
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
    mutationFn: async (data: ISignIn) => {
      const response = await api.post<UserProfile>(
        `/api/auth/restaurant-manager/login`,
        data
      );
      const restuarantToken = response?.data?.data?.data?.token;
      cookieStorage.setItem("restaurant", JSON.stringify(restuarantToken));
      console.log("restoken: ", response?.data?.data?.data?.token);
      // const allValues = response?.data?.data?.data?.token;
      // console.log(allValues);
    },
    mutationKey: ["restaurant-sign-in"],

    onSuccess(data) {
      toast.success("Successfully logged in");
      reset(), push("/get-started");
    },

    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <section className="h-screen">
      <div className="md:flex w-full h-full bg-white rounded-lg p-5 md:p-0">
        <div className="md:w-1/2 md:flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <h1 className="text-3xl font-bold text-dark3">Welcome back</h1>

            <div className="lg:w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Email address
              </label>
              <div>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="text-grayInactive text-lg font-normal mt-2 !w-full"
                  {...register("email", {
                    onChange: () => setIsTyping(true),
                  })}
                />
              </div>

              {errors.email && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.email?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <div className="items-center mt-2 justify-between flex h-12 rounded-2xl border border-neutral-200 bg-input py-5 text-sm focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                <input
                  type={type}
                  placeholder="Enter your password"
                  className="h-12 px-3 outline-none w-full rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("password", {
                    onChange: () => setIsTyping(true),
                  })}
                />

                {eyeopen ? (
                  <Eye
                    size={32}
                    className=" cursor-pointer pr-3"
                    onClick={handleClose}
                  />
                ) : (
                  <EyeSlash
                    size={32}
                    className=" cursor-pointer pr-3"
                    onClick={handleOpen}
                  />
                )}
              </div>
              {errors.password && (
                <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className="text-sm flex gap-1 mb-6">
              <p className="text-sm font-normal text-[#565D62]">
                Can&apos;t remember your password?{" "}
                <span
                  onClick={() => push("/restaurant-forgot-password")}
                  className="text-[#574DFF] cursor-pointer"
                >
                  Reset here
                </span>
              </p>
            </div>

            <Button
              type="submit"
              className="md:w-[300px] fixed bottom-0 right-0 left-0 md:relative mb-4 mx-5 md:mx-0 md:mb-0"
              variant="primary"
              disabled={isLoading || !isTyping}
            >
              {isLoading ? (
                <>
                  <span className="absolute left-0 right-0 flex justify-center items-center gap-1 text-white font-medium text-xl">
                    <Loader size="sm" className="opacity-70" />
                  </span>
                  Signing in
                </>
              ) : (
                <span
                  className={`font-medium text-xl ${
                    isLoading || !isTyping ? "text-[#D8D8D8]" : "text-white"
                  }`}
                >
                  Sign in
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="bg-primary text-white hidden md:flex flex-col h-full justify-center items-center w-1/2">
          <div className="max-w-sm lg:max-w-[26.75rem]">
            <h1 className="font-bold md:text-4xl lg:text-7xl md:!leading-[50px] lg:!leading-[90px]">
              Elevate your Restaurant Experience
            </h1>
            <p className="text-lg leading-7 mt-6 lg:mt-8">
              Streamline your operations, enhance guest experience, and maximize
              your revenue effortlessly. Join the DeelTix family today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

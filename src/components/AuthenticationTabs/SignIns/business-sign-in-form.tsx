"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { ISignIn, UserProfile } from "@/types";
import { useRouter } from "next/navigation";
import { cookieStorage } from "@ibnlanre/portal";
import { ErrorType, handleError } from "@/lib/handle-error";
import Image from "next/image";
import { Eye, EyeSlash } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const BusinessSignIn = ({ close }: { close: () => void }) => {
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

  const { data: display } = useQuery({
    queryFn: async () =>
      await api.get(`/api/restaurant-manager/show-get-started`),

    queryKey: ["show"],
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ISignIn) => {
      const response = await api.post<UserProfile>(
        `/api/auth/restaurant-manager/login`,
        data
      );
      const restuarantToken = response?.data?.data?.data?.token;
      cookieStorage.setItem("restaurant", JSON.stringify(restuarantToken));
    },
    mutationKey: ["restaurant-sign-in"],

    onSuccess(data) {
      display?.data?.data?.data?.showGetStartedPage
        ? push("/get-started")
        : push("/dashboard");
      toast.success("Successfully logged in");
      close;
      reset();
    },

    onError(error) {
      toast.error(
        "Hmm, that password doesn't look quite right. Please try again."
      );
      // handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className=" w-full bg-white rounded-lg p-5 md:p-0">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="">
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
          <label className="text-grayHelp text-lg font-medium">Password</label>
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
            <div className="flex items-center gap-2">
              <p className="text-white font-medium text-xl">Signing in</p>

              <span className=" ">
                <Loader size="sm" className="opacity-70" />
              </span>
            </div>
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
  );
};

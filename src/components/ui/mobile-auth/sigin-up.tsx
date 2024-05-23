"use client";
import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ISignUp } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { auth } from "@/axios-config";
import { cookieStorage } from "@ibnlanre/portal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "../button";
import { Input } from "../input";
import { Eye, EyeSlash } from "iconsax-react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

export const MobileSignUp = () => {
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");
  const { push } = useRouter();
  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }

  const formSchema = z.object({
    name: z.string().min(5, {
      message: "Enter your full name",
    }),

    email: z.string().email({
      message: "Enter your email address",
    }),
    phoneNumber: z.string().min(11, {
      message: "Enter your phone number",
    }),

    password: z.string().min(8, {
      message:
        "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
    }),
  });

  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ISignUp) => {
      await auth.post(`/api/auth/register`, data);
    },
    mutationKey: ["sign-up, user"],

    onSuccess() {
      toast.success("Yuppy! Check your email for verification code");
      cookieStorage.setItem("email", getValues("email"));
      push("/user-verify-email");
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <section>
      <div className="flex w-full bg-white rounded-lg">
        <div className=" w-full p-10">
          <div
            onClick={() => push("/")}
            className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
          >
            <MoveLeft />
            <p>Go back</p>
          </div>
          <h1 className="text-2xl font-bold pb-6">Create an account</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="w-full lg:max-w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Full name
              </label>
              <Input
                placeholder="e.g John Doe"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("name")}
              />
              {errors.name && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.name?.message}
                </div>
              )}
            </div>

            <div className="w-full lg:max-w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Email address
              </label>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("email")}
              />
              {errors.email && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.email?.message}
                </div>
              )}
            </div>

            <div className="w-full lg:max-w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Phone number
              </label>
              <Input
                placeholder="Enter your phone number"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.phoneNumber?.message}
                </div>
              )}
            </div>

            <div className="w-full lg:max-w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                <input
                  type={type}
                  placeholder="Password"
                  className="h-12 px-3 w-full outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("password")}
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

            <div className="text-sm flex gap-1">
              <input required type="checkbox" id="scales" name="scales" />
              <label htmlFor="scales">
                I agree to DeelTix&apos;s{" "}
                <span className="text-blue-500">terms</span> and{" "}
                <span className="text-blue-500">conditions</span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full lg:w-[300px]"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-white font-medium text-xl">
                  <span> Creating account</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">
                  Create account
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

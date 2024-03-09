"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { IRestaurantSignUp, ISignUp } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { api } from "@/axios-config";
import { cookieStorage } from "@ibnlanre/portal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { EyeSlash } from "iconsax-react";

export const RestaurantSignUp = () => {
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
  const formSchema = z.object({
    name: z.string().min(5, {
      message: "Enter your full name",
    }),
    restaurantName: z.string().min(5, {
      message: "Enter restaurant name",
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
  const { push } = useRouter();
  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      restaurantName: "",
    },
  });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IRestaurantSignUp) => {
      await api.post(`/api/auth/restaurant-manager/register`, data);
    },
    mutationKey: ["restaurant-signup", "user"],

    onSuccess() {
      toast.success("Yuppy! Check your email for verification code");
      cookieStorage.setItem("restaurantEmail", getValues("email"));
      reset();
      push("/restaurant-verify");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  console.log(errors);

  return (
    <section className="h-screen">
      <div className="md:flex w-full h-full  p-5 bg-white rounded-lg md:p-0">
        <div className="md:w-1/2 h-full md:flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-dark3">Create Account</h1>
              <p className="mt-2 text-grayInactive">
                Let&apos;s get to know you
              </p>
            </div>

            <div className="lg:w-[27rem]">
              <label className="text-grayHelp text-lg font-medium">
                Restaurant name
              </label>
              <Input
                placeholder="e.g John Doe"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("restaurantName", {
                  onChange: () => setIsTyping(true),
                })}
              />
              {errors.restaurantName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.restaurantName?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">Name</label>
              <Input
                placeholder="e.g John Doe"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("name", {
                  onChange: () => setIsTyping(true),
                })}
              />
              {errors.name && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.name?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Email address
              </label>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("email", {
                  onChange: () => setIsTyping(true),
                })}
              />
              {errors.email && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.email?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Phone number
              </label>
              <Input
                placeholder="Enter your phone number"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("phoneNumber", {
                  onChange: () => setIsTyping(true),
                })}
              />
              {errors.phoneNumber && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.phoneNumber?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <div className=" items-center  mt-2 justify-between flex h-12 rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                <input
                  type={type}
                  placeholder="Enter your password"
                  className="w-full h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
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

            <div className="text-sm flex gap-1">
              <input type="checkbox" id="scales" name="scales" required />
              <label htmlFor="scales">
                I agree to DeelTix&apos;s{" "}
                <span className="text-blue-500">terms</span> and{" "}
                <span className="text-blue-500">conditions</span>
              </label>
            </div>

            <Button
              type="submit"
              // className={`${
              //   errors !== null ? "hidden md:flex" : ""
              // } md:w-[300px] fixed bottom-0 right-0 left-0 md:static mb-4 mx-5 md:mx-0 md:mb-0`}
              className="md:w-[300px] fixed bottom-0 right-0 left-0 md:static mb-4 mx-5 md:mx-0 md:mb-0"
              variant="primary"
              disabled={isLoading || !isTyping}
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-white font-medium text-xl">
                  <span>Creating account</span> <Loader size="sm" />
                </span>
              ) : (
                <span
                  className={`font-medium text-xl ${
                    isLoading || !isTyping ? "text-[#D8D8D8]" : "text-white"
                  }`}
                >
                  Continue
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="bg-primary h-full text-white hidden md:flex flex-col justify-center items-center w-1/2">
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

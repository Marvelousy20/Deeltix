"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { ISignIn } from "@/types";
import { useRouter } from "next/navigation";
import { cookieStorage } from "@ibnlanre/portal";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export const RestaurantSignIn = () => {
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
      const response = await api.post(
        `/api/auth/restaurant-manager/login`,
        data
      );
      const values = await response.data?.data?.data;
      cookieStorage.setItem("restaurant", JSON.stringify(values));
      console.log(values?.token);
    },
    mutationKey: ["restaurant-sign-in"],

    onSuccess(data) {
      toast.success("Successfully logged in");
      reset(), push("/get-started");
      console.log(data);
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
      <div className="flex w-full h-full bg-white rounded-lg">
        <div className="h-full w-1/2 p-5">
          <Image
            src="/restaurant-image.png"
            width={400}
            height={400}
            alt="restaurant"
            objectFit="cover"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-bold pb-6">Sign in to your account</h1>
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
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("email")}
              />
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
              <Input
                // type="password"
                placeholder="Enter your password"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className="text-sm flex gap-1 mb-6">
              <p className="text-sm font-normal text-[#565D62]">
                Can’t remember your password?{" "}
                <span
                  onClick={() => push("/restaurant-forgot-password")}
                  className="text-[#574DFF] cursor-pointer"
                >
                  Reset here
                </span>
              </p>
            </div>

            <Button type="submit" className=" w-[300px]" variant="primary">
              {isLoading ? (
                <span className="flex items-center gap-1 text-white font-medium text-xl">
                  <span>Signing in</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">Sign in</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

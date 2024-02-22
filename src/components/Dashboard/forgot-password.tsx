"use client";
import React from "react";
import { MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
export const RestaurantForgotPassword = () => {
  const { push } = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Enter your email address",
    }),
  });

  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ForgotPassword) => {
      await api.post(`/api/auth/restaurant-manager/forgot-password`, data);
    },
    mutationKey: ["restaurant-forgot-password"],

    onSuccess() {
      toast.success("Yuppy! Check your email for otp code");
      push("/restaurant-reset-password");
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
      <div className="flex w-full h-full bg-white rounded-lg gap-5">
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
          <div
            onClick={() => push("/restaurant-signin")}
            className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
          >
            <MoveLeft />
            <p>Go back</p>
          </div>
          <h1 className="text-3xl font-bold pb-6">Forget password</h1>
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
            <Button type="submit" className=" w-[300px]" variant="primary">
              {isLoading ? (
                <span className="flex items-center gap-2 text-white font-medium text-xl">
                  <span> Resetting password</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">
                  Reset password
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

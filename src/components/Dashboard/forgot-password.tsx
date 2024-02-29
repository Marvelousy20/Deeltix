"use client";
import { useState } from "react";
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
export const RestaurantForgotPassword = () => {
  const { push } = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Enter your email address",
    }),
  });
  const [isTyping, setIsTyping] = useState(false);

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
    console.log(values);
  };

  return (
    <section className="h-screen">
      <div className="md:flex w-full h-full p-5 bg-white md:p-0 rounded-lg gap-5">
        <div className="md:w-1/2 md:flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <div
                onClick={() => push("/restaurant-signin")}
                className="mb-3 cursor-pointer flex gap-1 text-sm text-[#565D62] items-center"
              >
                <MoveLeft />
                <p>Go back</p>
              </div>
              <h1 className="text-3xl font-bold text-dark3">Forget password</h1>
            </div>

            <div className="lg:w-[27rem]">
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
            <Button
              type="submit"
              className="md:w-[300px] fixed bottom-0 right-0 left-0 md:static mb-4 mx-5 md:mx-0 md:mb-0"
              variant="primary"
            >
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

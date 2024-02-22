"use client";
import { MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { IReVerifyEmail, IResetPassword } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import { cookieStorage } from "@ibnlanre/portal";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
export const RestaurantResetPassword = () => {
  const [otp, setOtp] = useState("");
  const { push } = useRouter();
  const formSchema = z
    .object({
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const { handleSubmit, register, formState, reset } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IResetPassword) => {
      await api.post(`/api/auth/restaurant-manager/reset-password`, data);
    },
    mutationKey: ["restaurant-reset-password"],

    onSuccess() {
      reset();
      push("/restaurant-signin");
      toast.success("Kindly log in your account");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const email = cookieStorage.getItem("restaurantEmail");
  useMemo(() => {
    email;
  }, [email]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values, email, otp);
    mutate({ ...values, email, otp });
  };

  // Resend password
  const { mutate: Resendpassword, isLoading: ResendLoading } = useMutation({
    mutationFn: async (data: IReVerifyEmail) => {
      await api.post(
        `/api/auth/restaurant-manager/resend-forgot-password`,
        data
      );
    },
    mutationKey: ["restaurant-resend-password"],

    onSuccess() {
      toast.success("Check your email for OTP code");
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const resendEmail = cookieStorage.getItem("restaurantEmail");
  useMemo(() => {
    resendEmail;
  }, [resendEmail]);

  const handleResend = (e: FormEvent) => {
    e.preventDefault();
    Resendpassword({ email: resendEmail });
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
            onClick={() => push("/restaurant-forgot-password")}
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
            <div className="max-w-[300px]">
              <label className="text-grayHelp w-[300px] pb-2 font-medium flex items-center justify-between">
                <p className="font-medium text-lg text-[#565D62]">Otp</p>
                <div
                  onClick={handleResend}
                  className="text-base font-medium text-[#574DFF] underline underline-offset-4 cursor-pointer"
                >
                  {ResendLoading ? (
                    <span className="flex items-center gap-2">
                      <p>Resending code</p>
                      <Loader size="sm" />
                    </span>
                  ) : (
                    <p>Resend code</p>
                  )}
                </div>
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="tel"
                inputStyle="!w-[45px] h-10 bg-[#F0F3F8] rounded-[16px] text-center outline-none transition-all4 border border-[#F0F3F8] text-[32px] text-[#2C2929] font-medium"
                containerStyle="flex items-start gap-x-2 max-w-[300px]"
                renderInput={(props) => (
                  <input {...props} style={{ width: "3.3rem" }} />
                )}
              />
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <Input
                placeholder="Enter your email address"
                // type="password"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("password")}
              />
              {errors.password && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Confirm password
              </label>
              <Input
                placeholder="Enter your email address"
                // type="password"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("confirmPassword")}
              />
              {errors.password && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.confirmPassword?.message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className=" w-[300px]"
              variant="primary"
              disabled={otp === "" ? true : false}
            >
              {isLoading ? (
                <span className="flex items-center gap-1 text-white font-medium text-xl">
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

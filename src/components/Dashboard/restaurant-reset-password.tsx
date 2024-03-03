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
import { Eye, EyeSlash } from "iconsax-react";
export const RestaurantResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");

  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }

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
      <div className="md:flex w-full h-full bg-white rounded-lg p-5 md:p-0">
        <div className="md:w-1/2 md:flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <div
                onClick={() => push("/restaurant-forgot-password")}
                className="mb-3 cursor-pointer flex gap-1 text-sm text-[#565D62] items-center"
              >
                <MoveLeft />
                <p>Go back</p>
              </div>
              <h1 className="text-3xl font-bold text-dark3">Forget password</h1>
            </div>

            <div className="">
              <label className="text-grayHelp w-[300px]  pb-2 font-medium flex items-center justify-between">
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
                inputStyle="!w-[45px] h-10 bg-[#F0F3F8] rounded-[8px] text-center outline-none transition-all4 border border-[#F0F3F8] text-[32px] text-[#2C2929] font-medium"
                containerStyle="flex items-start gap-x-2 max-w-[27rem]"
                renderInput={(props) => (
                  <input {...props} style={{ width: "3.3rem" }} />
                )}
              />
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Password
              </label>
              <div className=" items-center  mt-2 justify-between flex h-12 rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                <input
                  type={type}
                  placeholder="Enter your password"
                  className="h-12 px-3 outline-none w-full lg:w-[27rem] rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
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
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Confirm password
              </label>
              <div className=" items-center  mt-2 justify-between flex h-12 rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                <input
                  type={type}
                  placeholder="Enter your password"
                  className="h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("confirmPassword")}
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
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.confirmPassword?.message}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="md:w-[300px] fixed bottom-0 right-0 left-0 md:static mb-4 mx-5 md:mx-0 md:mb-0"
              variant="primary"
              disabled={otp === "" ? true : false}
            >
              {isLoading ? (
                <span className="flex items-center gap-1 text-white font-medium text-xl">
                  <span> Resetting password</span> <Loader size="sm" />
                </span>
              ) : (
                <span
                  className={`font-medium text-xl ${
                    isLoading ? "text-[#D8D8D8]" : "text-white"
                  }`}
                >
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

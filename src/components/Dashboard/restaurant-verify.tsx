"use client";
import React, { FormEvent, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { IReVerifyEmail, IVerifyEmail } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ErrorType, handleError } from "@/lib/handle-error";
import { cookieStorage } from "@ibnlanre/portal";
import { Button } from "../ui/button";
import { TextGenerateEffect } from "../ui/text-generate-effect";

export const RestaurantVerifyPage = () => {
  const { push } = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IVerifyEmail) => {
      await api.post(`/api/auth/restaurant-manager/verify-email`, data);
    },
    mutationKey: ["restaurant-verify"],
    onSuccess() {
      toast.success("Email verified, you can sign-in now");
      setOtp("");
      push("/restaurant-signin");
    },

    onError(error) {
      handleError(error as ErrorType);
    },
  });

  // Resend verify email
  const { mutate: resendPin, isLoading: resendLoading } = useMutation({
    mutationFn: async (data: IReVerifyEmail) => {
      await api.post(`/api/auth/restaurant-manager/resend-verify-email`, data);
    },
    mutationKey: ["restaurant-re-verify"],
    onSuccess() {
      toast.success("Otp has been sent to your email");
    },

    onError(error) {
      handleError(error as ErrorType);
    },
  });

  let email = cookieStorage.getItem("restaurantEmail");

  useMemo(() => {
    email;
  }, [email]);

  const handleReverify = (e: FormEvent) => {
    e.preventDefault();
    resendPin({ email: email });
    console.log(resendPin({ email: email }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email: email, otp: otp });
    console.log("email result: ", { email, otp });
  };

  const words = "Elevate your Restaurant Experience";
  return (
    <div className="h-screen">
      <section className="md:flex w-full h-full bg-white rounded-lg p-5 md:p-0">
        <div className="md:w-1/2 md:flex flex-col justify-center items-center">
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold pb-6 text-dark3">
                Verify Email
              </h1>

              <p className="mt-2 text-grayInactive">
                {`Enter the code sent to ${email}`}
              </p>
            </div>

            <div className="">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="tel"
                inputStyle="!w-[45px] h-10 bg-[#F0F3F8] rounded-[8px] text-center outline-none transition-all4 border border-[#F0F3F8] text-[32px] text-[#2C2929] font-medium"
                containerStyle="flex items-start gap-x-2 !max-w-[400px]"
                renderInput={(props) => (
                  <input {...props} style={{ width: "3.3rem" }} />
                )}
              />

              {error && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {error}
                </div>
              )}
            </div>

            <section className="text-sm font-normal text-[#565D62] flex items-center gap-1">
              Didn&apos;t get a code?{" "}
              <div
                onClick={handleReverify}
                className="text-[#574DFF] cursor-pointer "
              >
                {resendLoading ? (
                  <span className="flex items-center gap-2">
                    <span> Resending </span> <Loader size="sm" />{" "}
                  </span>
                ) : (
                  <span>Resend</span>
                )}
              </div>
            </section>
            <Button
              disabled={otp === "" ? true : false}
              type="submit"
              className="md:w-[300px] fixed bottom-0 right-0 left-0 md:static mb-4 mx-5 md:mx-0 md:mb-0"
              variant="primary"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-white font-medium text-xl">
                  <span>Verifying email</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">
                  Verify email
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="bg-primary text-white hidden md:flex flex-col h-full justify-center items-center w-1/2">
          <div className="max-w-sm lg:max-w-[26.75rem]">
            <h1 className="font-bold md:text-4xl lg:text-7xl md:!leading-[50px] lg:!leading-[90px]">
              <TextGenerateEffect words={words} />
            </h1>
            <p className="text-lg leading-7 mt-6 lg:mt-8">
              Streamline your operations, enhance guest experience, and maximize
              your revenue effortlessly. Join the DeelTix family today!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

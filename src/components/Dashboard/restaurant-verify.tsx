"use client";
import React, { FormEvent, useMemo, useState } from "react";
import OtpInput from "react-otp-input";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import auth from "@/axios-config";
import Image from "next/image";
import { IReVerifyEmail, IVerifyEmail } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ErrorType, handleError } from "@/lib/handle-error";
import { cookieStorage } from "@ibnlanre/portal";
import { Button } from "../ui/button";

export const RestaurantVerifyPage = () => {
  const { push } = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IVerifyEmail) => {
      await auth.post(`/api/auth/restaurant-manager/verify-email`, data);
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
      await auth.post(`/api/auth/restaurant-manager/resend-verify-email`, data);
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
  return (
    <div className="h-screen">
      <section className="flex w-full h-full bg-white rounded-lg">
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
          <h1 className="text-3xl font-bold pb-6">Verify Email</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType="tel"
                inputStyle="!w-[45px] h-10 bg-[#F0F3F8] rounded-[16px] text-center outline-none transition-all4 border border-[#F0F3F8] text-[32px] text-[#2C2929] font-medium"
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
            <div className="text-sm font-normal text-[#565D62]">
              {`Enter the code sent to ${email}`}
            </div>

            <section className="text-sm font-normal text-[#565D62] flex items-center gap-1">
              Didn't get a code{" "}
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
              className=" w-[300px]"
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
      </section>
    </div>
  );
};

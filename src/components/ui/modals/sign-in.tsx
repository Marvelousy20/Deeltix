"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { Loader } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { ISignIn } from "@/types";
import { cookieStorage } from "@ibnlanre/portal";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useDisclosure } from "@mantine/hooks";
import { Input } from "../input";
import { Button } from "../button";
import { Modal } from "@mantine/core";
import ModalPassword from "./modal-password";
import { Eye, EyeSlash, TrendUp } from "iconsax-react";
import { useUser } from "@/context/user/user";

export default function ModalSignIn({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) {
  const [forgotpasswordOpen, { open, close: forgotpasswordClose }] =
    useDisclosure(false);
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");
  const { signIn, setIsLoggedIn } = useUser();

  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }

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

  const { mutate, isLoading, data } = useMutation({
    mutationFn: signIn,
    mutationKey: ["sign-in"],

    onSuccess() {
      toast.success("Successfully logged in");
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      reset();
      close();
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
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="70%"
        style={{
          zIndex: "auto",
        }}
      >
        <div className="flex w-full bg-white rounded-lg">
          <div className="lg:w-1/2 w-full lg:p-10 p-0">
            <h1 className="lg:text-3xl text-2xl font-bold pb-6">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="w-full lg:max-w-[27rem]">
                <label className="text-grayHelp text-lg font-medium">
                  Email address
                </label>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="text-grayInactive w-full lg:max-w-[27rem] text-lg font-normal mt-2"
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
                  Password
                </label>

                {/* input */}
                <div className="items-center mt-2 w-full lg:max-w-[27rem justify-between flex h-12  rounded-full border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="h-12 px-3 outline-none w-full  rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
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

              <div className="text-sm flex gap-1 mb-6">
                <p className="text-sm font-normal text-[#565D62]">
                  Can’t remember your password?{" "}
                  <span
                    onClick={() => {
                      open();
                      close();
                    }}
                    className="text-[#574DFF] cursor-pointer"
                  >
                    Reset here
                  </span>
                </p>
              </div>

              <Button
                type="submit"
                className=" lg:w-[300px] w-full"
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-white font-medium text-xl">
                    <span>Signing in</span> <Loader size="sm" />
                  </span>
                ) : (
                  <span className="text-white font-medium text-xl">
                    Sign in
                  </span>
                )}
              </Button>
            </form>
          </div>

          <div className="rounded-r-lg hidden lg:block w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
        </div>
      </Modal>
      <ModalPassword opened={forgotpasswordOpen} close={forgotpasswordClose} />
    </section>
  );
}

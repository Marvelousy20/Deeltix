"use client";
import React from "react";
import { Modal } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ISignUp } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import auth from "@/axios-config";
import { cookieStorage } from "@ibnlanre/portal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "../button";
import { Input } from "../input";
import { VerifyEmail } from "./verify-email";

export const SignUp = ({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) => {
  const [isOpened, { open, close: isClose }] = useDisclosure(false);

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
      console.log(cookieStorage.setItem("email", getValues("email")));
      reset();
      open();
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
      >
        <div className="flex w-full bg-white rounded-lg">
          <div className="w-1/2 p-10">
            <h1 className="text-3xl font-bold pb-6">Create an account</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="">
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
                  Phone number
                </label>
                <Input
                  // type="password"
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

              <div className="text-sm flex gap-1">
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">
                  I agree to DeelTix's{" "}
                  <span className="text-blue-500">terms</span> and{" "}
                  <span className="text-blue-500">conditions</span>
                </label>
              </div>

              <Button
                type="submit"
                className=" w-[300px]"
                variant="primary"
                // disabled={disabled}
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
          <div className="rounded-r-lg w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
          <VerifyEmail opened={isOpened} close={isClose} />
        </div>
      </Modal>
    </section>
  );
};

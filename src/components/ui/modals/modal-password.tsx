"use client";
import { Modal } from "@mantine/core";
import { MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ForgetPassword from "@/components/ForgetPassword";
import { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import ModalResetPassword from "./reset-password";

function ModalPassword({ opened, close }: { opened: any; close: () => void }) {
  const [isOpen, { open, close: handleClose }] = useDisclosure(false);

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
      await auth.post(`/api/auth/forgot-password`, data);
    },
    mutationKey: ["forgot-password"],

    onSuccess() {
      toast.success("Yuppy! Check your email for otp code");
      close();
      open();
      reset();
      push("");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      <Modal
        className="bg-blue-500"
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="70%"
        style={{
          zIndex: "2000",
          position: "relative",
        }}
      >
        <div className="flex w-full bg-white rounded-lg gap-5">
          <div className="lg:w-1/2 w-full lg:p-10 p-0">
            <div
              onClick={close}
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
              <Button
                type="submit"
                className=" w-[300px]"
                variant="primary"
                disabled={isLoading}
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
          <div className="rounded-r-lg w-full lg:block hidden bg-[url('/signup-rest.png')] bg-cover bg-no-repeat"></div>
          {/* <ModalPassword opened={opened} close={close} /> */}
        </div>
        {/* <ForgetPassword /> */}
      </Modal>
      <ModalResetPassword opened={isOpen} close={handleClose} />
    </>
  );
}

export default ModalPassword;

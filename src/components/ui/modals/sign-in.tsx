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
import { SignInTabs } from "@/components/AuthenticationTabs/SignIns/sign-in-tab";

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
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      reset();
      close();
      toast.success("Successfully logged in");
    },

    onError(error) {
      toast.error(
        "Hmm, that password doesn't look quite right. Please try again."
      );
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <section className="">
      <Modal
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
        <div className="flex w-full bg-white rounded-lg">
          <div className="w-1/2">
            <div className="flex flex-col items-center max-w-[400px]">
              <h1 className="text-2xl font-bold pb-6">Sign in to account</h1>
              <p className="text-lg font-normal text-center">
                List your restaurant among the favourite restaurants in town
              </p>
            </div>
            <div className="flex items-center justify-center">
              <SignInTabs
                personalClose={() => close()}
                businessClose={() => close()}
              />
            </div>
          </div>

          <div className="rounded-r-lg hidden lg:block w-1/2 bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
        </div>
      </Modal>
      <ModalPassword opened={forgotpasswordOpen} close={forgotpasswordClose} />
    </section>
  );
}

"use client";
import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ISignUp } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { auth } from "@/axios-config";
import { cookieStorage } from "@ibnlanre/portal";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "../button";
import { Input } from "../input";
import { VerifyEmail } from "./verify-email";
import { Eye, EyeSlash } from "iconsax-react";
import { SignUpTabs } from "@/components/AuthenticationTabs/SignUps/sign-up-tab";

export const SignUp = ({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) => {
  const [isOpened, { open, close: isClose }] = useDisclosure(false);

  return (
    <section>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        style={{
          zIndex: "2000",
          position: "relative",
        }}
        size="70%"
      >
        <div className="flex w-full bg-white rounded-lg">
          <div className="w-1/2">
            <div className="flex flex-col items-center max-w-[440px]">
              <h1 className="text-2xl font-bold pb-6">Create an account</h1>
              <p className=" text-lg font-normal text-center">
                View and make reservations among restaurants around you
              </p>
            </div>
            <SignUpTabs
              personalClose={() => close()}
              businessClose={() => close()}
            />
          </div>
          <div className="rounded-r-lg w-1/2 lg:block hidden bg-[url('/signup-rest.png')] bg-cover bg-no-repeat bg-center"></div>
        </div>
      </Modal>
      <VerifyEmail opened={isOpened} close={isClose} />
    </section>
  );
};

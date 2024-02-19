"use client";
import React from "react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { Button } from "../button";
import ModalSignIn from "./sign-in";

export const SuccessMessage = ({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) => {
  const [login, { open, close: loginClose }] = useDisclosure();

  const handleClicked = () => {
    close();
    open();
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="40%"
      >
        <section>
          <div className="flex flex-col gap-6 p-[32px]  items-center justify-center">
            <Image
              src="/sucess-message.svg"
              width={100}
              height={100}
              alt="success-message"
            />
            <div className="flex flex-col gap-3 justify-center items-start">
              <h3 className=" text-3xl font-bold text-[#2C2929]">
                Password reset successful
              </h3>
              <p className="font-normal text-3xl text-[#42474B] max-w-[400px]">
                Your password has been reset, you can now login to your account
              </p>
            </div>
            <Button
              // onClick={handleClicked}
              className="bg-[#2C2929] font-bold text-xl text-center text-white"
            >
              Go back to sign in
            </Button>
          </div>
        </section>
      </Modal>
      <ModalSignIn opened={login} close={loginClose} />
    </div>
  );
};

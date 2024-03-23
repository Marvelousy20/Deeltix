import { Modal } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export const ConfirmReservation = ({
  opened,
  close,
  date,
  time,
  guest,
  clearField,
}: {
  opened: any;
  close: () => void;
  date: string;
  time: string;
  guest: string;
  clearField: () => void;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size="40%"
    >
      <div className="w-full h-[2px] bg-[#E7EAF1] my-6"></div>
      <section className="flex flex-col py-5 max-w-[300px] items-center justify-center mx-auto gap-4">
        <Image
          src="/confirmed.svg"
          width={60}
          height={60}
          alt="confirmation logo"
        />
        <h3 className="font-bold text-2xl text-[#2C2929]">
          Reservation confirmed!
        </h3>

        <h2>{`${date} at ${time}, ${guest} guests.`}</h2>
        <Button
          className="bg-[#2C2929] text-white w-full  text-center"
          onClick={clearField}
        >
          Okay
        </Button>
      </section>
    </Modal>
  );
};

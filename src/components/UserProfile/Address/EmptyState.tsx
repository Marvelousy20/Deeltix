import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import UserAddressModal from "./AdressModal";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { UserAddressDetails } from "@/types";

export const AddressEmptyState = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <section className=" py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <figure className="rounded-full flex items-center justify-center h-[80px] w-[80px] border bg-milky border-grayoutline">
          <Image src="/order.png" width={50} height={50} alt="Order" />
        </figure>
        <p className=" text-2xl font-normal text-grayBlack2">
          There’s no saved address here
        </p>
        <Button
          onClick={open}
          className="flex text-white items-center gap-2 py-3 px-4 bg-dark3"
        >
          <Plus />{" "}
          <span className="font-normal text-xl rounded-[40px] ">
            Add new address
          </span>
        </Button>
      </div>
      <UserAddressModal opened={opened} close={close} />
    </section>
  );
};

import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import UserAddressModal from "./AdressModal";
import { Cards } from "./Card";
import { AddressEmptyState } from "./EmptyState";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { UserAddressDetails } from "@/types";

export const AddressDetails = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // const { data, isLoading } = useQuery({
  //   queryFn: async () =>
  //     await auth.get<UserAddressDetails>(`/api/user/profile/address`),
  //   queryKey: ["fetch-user-address"],
  //   select: ({ data }) => data?.data?.data,
  // });

  return (
    <div className="bg-white  lg:pt-[56px] pt-6 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <h3 className="lg:text-4xl text-2xl font-bold text-dark2">Address</h3>
          <Button
            onClick={open}
            className="flex items-center lg:gap-2 gap-1 lg:py-3 py-2 lg:px-4 px-2 bg-card"
          >
            <Plus />{" "}
            <span className="font-normal text-xl rounded-[40px] text-dark2">
              Add new address
            </span>
          </Button>
        </div>
        <section className="w-full flex items-center justify-center border border-grayoutline rounded-[32px]">
          <Cards />
        </section>
      </div>
      <UserAddressModal opened={opened} close={close} />
    </div>
  );
};

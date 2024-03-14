import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Location } from "iconsax-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DeleteAddress } from "./DeleteAddressModal";
import Modal from "@/components/ui/Modal";
import { auth } from "@/axios-config";
import { useQuery } from "@tanstack/react-query";
import { UserAddressDetails } from "@/types";
import { AddressEmptyState } from "./EmptyState";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export const Cards = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const pathName = usePathname();
  const { push } = useRouter();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<UserAddressDetails>(`/api/user/profile/address`),
    queryKey: ["fetch-user-address"],
    select: ({ data }) => data?.data?.data,
  });

  const userAddress = [
    {
      id: 1,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
    {
      id: 2,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
    {
      id: 3,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
  ];
  return (
    <div className="w-full">
      {data?.addresses?.length ? (
        <div className="p-6 grid lg:grid-cols-3 grid-cols-1 gap-2">
          {data?.addresses?.map((item) => (
            <section
              key={item.id}
              className="flex flex-col gap-5 border border-grayoutline rounded-[20px] p-6"
            >
              <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#E8E8E8]">
                <Location size="20" color="#000000" />
              </div>

              <div className="text-[#2C2929] font-normal text-2xl flex flex-col gap-2">
                <p>{item?.address}</p>
                <p>{item?.state}</p>
                <p>{item?.country}</p>
              </div>

              <Button
                onClick={open}
                className="flex items-center gap-2 bg-[#FFF0F0]"
              >
                <Trash2 color="#574DFF" size={17} />
                <span className="text-[#574DFF] font-normal text-lg">
                  Delete
                </span>
              </Button>
              <DeleteAddress id={item.id} opened={opened} close={close} />
            </section>
          ))}
        </div>
      ) : (
        <AddressEmptyState />
      )}
    </div>
  );
};

"use client";
import { DataTable } from "@/components/Table/DataTable";
import { People } from "iconsax-react";
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { guestColumns, guestData } from "./table-column";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { useUser } from "@/context/restaurant/user";
import { IAllGuestResponse } from "@/types";
import { AddNewGuest } from "./add-guest";

export interface IGuest {
  headings: string;
  number: string;
  icon: React.ReactNode;
}
export const Guests = () => {
  const [addguest, setAddGuest] = useState<boolean>(false);
  const { restaurantId } = useUser();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      return await api.get<IAllGuestResponse>(
        `/api/reservations/${restaurantId}/guests/all`
      );
    },
    queryKey: ["guestbook", "book"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  const list: IGuest[] = [
    {
      headings: "Total Guest",
      number: "520",
      icon: <People color="#574DFF" />,
    },
    // {
    //   headings: "Total Guest",
    //   number: "2,100",
    //   icon: <People color="#574DFF" />,
    // },
  ];
  return (
    <div className="pt-5 px-8">
      <section className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Guest book</h3>
          <p className="font-normal text-sm lg:text-base text-[#636C71]">
            A list of all seated guest
          </p>
        </div>
        <div
          onClick={() => setAddGuest(true)}
          className="flex justify-center lg:justify-start items-center cursor-pointer gap-2 mt-4 lg:mt-0 py-3 px-4 bg-[#574DFF] rounded-[40px]"
        >
          <PlusCircle color="#F0F3F8" />
          <p className="text-[#F0F3F8] text-sm font-medium">new guest</p>
        </div>
      </section>

      <section className="grid grid-cols-1 py-8">
        {list.map((item, _idx) => (
          <div key={_idx} className="border border-[#EAECF0]  p-[40px]">
            <section className="flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-base text-[#636C71]">
                  {item.headings}
                </p>
                <h3 className="font-bold text-3xl text-[#2C2929]">
                  {data?.total}
                </h3>
              </div>
              <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-[#574DFF1A]">
                {item.icon}
              </div>
            </section>
          </div>
        ))}
      </section>

      {/* table */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-y-4 lg:justify-between p-[15px] w-full bg-[#F2F4F7] rounded-[24px]">
          <h3 className="font-medium text-xl text-[#2C2929]">Guest List</h3>
          <Input placeholder="Filter names..." className="max-w-sm" />
        </div>
        <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
          <DataTable columns={guestColumns} data={data?.guests ?? []} />
        </div>
      </section>

      <AddNewGuest addguest={addguest} setAddGuest={setAddGuest} />
    </div>
  );
};

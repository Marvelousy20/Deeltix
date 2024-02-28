"use client";
import { Input } from "@/components/ui/input";
import { Wallet3 } from "iconsax-react";
import { MinusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { walletColumns, walletData } from "./table-column";
import { DataTable } from "@/components/Table/DataTable";
import { UserReceipt } from "./receipt-modal";

export const UserWallet = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section className="p-[32px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Wallet</h3>
          <p className="font-normal text-base text-[#636C71]">
            Inflow, outflow here we go
          </p>
        </div>
        <div
          onClick={open}
          className="flex items-center cursor-pointer gap-2 py-3 px-4 bg-[#574DFF] rounded-[40px]"
        >
          <MinusCircle color="#F0F3F8" />
          <p className="text-[#F0F3F8] text-sm font-medium">Withdraw</p>
        </div>
      </div>

      <section className=" py-8">
        <div className="border border-[#EAECF0]  p-[40px]">
          <section className="flex justify-between items-start">
            <div className="flex flex-col gap-3">
              <p className="font-medium text-base text-[#636C71]">
                Total Revenue
              </p>
              <h3 className="font-bold text-3xl text-[#2C2929]">
                ₦5,450,500.00
              </h3>
            </div>
            <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-[#574DFF1A]">
              <Wallet3 size="18" color="#574DFF" />
            </div>
          </section>
        </div>
      </section>

      {/* table */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between p-[15px] w-full bg-[#F2F4F7] rounded-[24px]">
          <h3 className="font-medium text-xl text-[#2C2929]">Menu</h3>
          <Input placeholder="Filter names..." className="max-w-sm" />
        </div>
        <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
          <DataTable columns={walletColumns} data={walletData} />
        </div>
      </section>
      <UserReceipt opened={opened} close={close} />
    </section>
  );
};

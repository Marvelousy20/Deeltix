"use client";
import React from "react";
import { Modal } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export const UserReceipt = ({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="30%"
      >
        <section className=" flex items-center justify-center py-4">
          <div className="flex flex-col gap-4 w-[300px]">
            <div className="flex items-center justify-between">
              <h3 className=" font-bold text-xl text-[#121212]">Receipt</h3>
              <div
                onClick={close}
                className="h-[20px] w-[20px] cursor-pointer rounded-full flex items-center justify-center border border-[#2C2929]"
              >
                <X color="#2C2929" />
              </div>
            </div>
            <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
              <article className="flex items-center justify-between">
                <div className="flex flex-col gap-4 font-medium text-base text-[#636C71]">
                  <h4>Date</h4>
                  <h4>Type</h4>
                  <h4>Amount</h4>
                  <h4>Receipt</h4>
                </div>
                <div className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                  <h4>9:02 AM</h4>
                  <h4>Withdrawer</h4>
                  <h4>₦10,000.00</h4>
                  <h4>Olivier</h4>
                </div>
              </article>
            </div>
            <Button className="bg-[#F0F3F8] mt-4 w-full">
              <p className="text-center font-bold text-xl text-[#636C71]">
                Download receipt
              </p>
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

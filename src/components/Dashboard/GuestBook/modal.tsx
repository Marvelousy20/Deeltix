"use client";
import React from "react";
import { Modal } from "@mantine/core";
import { Input } from "@/components/ui/input";
export const GuestUpdate = ({
  opened,
  close,
  user,
  email,
  number,
}: {
  opened: any;
  close: () => void;
  user: string;
  email: string;
  number: string;
}) => {
  return (
    <div>
      <Modal
        // id={id}
        opened={opened}
        onClose={close}
        centered
        title="Guest details"
      >
        <section className=" w-full flex items-center justify-center py-4">
          <div className="flex flex-col gap-4 w-[400px]">
            {/* <div className="flex items-center justify-between">
              <h3 className=" font-bold text-xl text-[#121212]">Receipt</h3>
              <div
                onClick={close}
                className="h-[20px] w-[20px] cursor-pointer rounded-full flex items-center justify-center border border-[#2C2929]"
              >
                <X color="#2C2929" />
              </div>
            </div> */}
            <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
              <article className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Full name
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                    {user}
                  </h4>
                </div>

                <div className="flex items-start justify-between">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Email address
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                    {email}
                  </h4>
                </div>

                <div className="flex items-start justify-between">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Phone number
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                    {number}
                  </h4>
                </div>
              </article>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};

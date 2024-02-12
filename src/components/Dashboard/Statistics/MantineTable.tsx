"use client";
import React from "react";

export const MantineTableee = () => {
  return (
    <div className="w-full border border-[#EAECF0] rounded-[24px] overflow-auto">
      <div className="border-b pb-[20px] border-[#EAECF0] ">
        <div className="flex items-center justify-between   p-[20px] ">
          <h3 className="font-medium text-lg text-comment">
            Upcoming reservations
          </h3>
          <p className="font-normal text-sm text-[#574DFF]">View all</p>
        </div>
      </div>
      <section className="border-b bg-[#F7F7F7] border-[#EAECF0]">
        <div className="flex text-sm font-normal text-[#565D62] items-center justify-between py-[13px] px-[24px]">
          <h3>Date</h3>
          <h3>Amount</h3>
          <h3>Type</h3>
        </div>
      </section>

      <section className="border-b  border-[#EAECF0]">
        <div className="flex items-center justify-between py-[18px] px-[24px]">
          <div className="flex flex-col ">
            <h2 className="text-sm font-normal text-grayBlack">
              21st Jan, 2023
            </h2>
            <p>9:02 AM</p>
          </div>
          <p>₦100</p>
          <p>Service charge</p>
        </div>
      </section>

      <section className="border-b  border-[#EAECF0]">
        <div className="flex items-center justify-between py-[18px] px-[24px]">
          <div className="flex flex-col ">
            <h2>21st Jan, 2023</h2>
            <p>9:02 AM</p>
          </div>
          <p>₦100</p>
          <p>Service charge</p>
        </div>
      </section>
      <section className="">
        <div className="flex items-center justify-between py-[18px] px-[24px]">
          <div className="flex flex-col ">
            <h2>21st Jan, 2023</h2>
            <p>9:02 AM</p>
          </div>
          <p>₦100</p>
          <p>Service charge</p>
        </div>
      </section>
    </div>
  );
};

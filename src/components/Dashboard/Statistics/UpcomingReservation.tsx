"use client";
import React from "react";
import { UserRound, Bookmark, ChevronRight } from "lucide-react";
import {
  ShoppingBag,
  Note1,
  LogoutCurve,
  Reserve,
  ArrowDown2,
} from "iconsax-react";
import clsx from "clsx";
import { ILoggedinUser } from "@/types";
import Link from "next/link";

export const DashboardReservation = () => {
  const userDetails = [
    {
      name: "New Reservation",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ArrowDown2 color="#574DFF" size={18} />,
      time: "10:00 AM",
      route: "/profile",
    },
    {
      name: "New Reservation",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ArrowDown2 color="#574DFF" size={18} />,

      time: "10:00 AM",
      route: "/orders",
    },
    {
      name: "New Reservation",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ArrowDown2 color="#574DFF" size={18} />,

      time: "10:00 AM",
      route: "/reservations",
    },
    {
      name: "New Reservation",
      para: "Olivia Martins",
      icon: <Reserve color="#565D62" />,
      chevron: <ArrowDown2 color="#574DFF" size={18} />,

      time: "10:00 AM",
      route: "/bookmarks",
    },
  ];
  return (
    <div className=" bg-[#574DFF0D] w-full rounded-[20px] border border-[#574DFF0D] flex flex-col gap-6 p-5">
      <div className="flex items-center justify-between border-b border-[#D0D5DD] pb-3">
        <h3 className="font-medium text-lg text-comment">
          Upcoming reservations
        </h3>
        <p className="font-normal text-sm text-[#574DFF] cursor-pointer">
          View all
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {userDetails.map((items, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between border-b border-transparent pb-4"
          >
            <div className="flex items-start gap-3">
              <div className="">{items.icon}</div>
              <div className="flex flex-col gap-1">
                <h3 className=" text-base font-normal text-grayBlack">
                  {items.name}
                </h3>
                <p>{items.para}</p>
              </div>
            </div>
            <p>{items.time}</p>
            <div className=" gap-2 bg-[#574DFF1A] rounded-[40px] py-2 cursor-pointer h-[100] w-[100px] flex items-center justify-center">
              <p className="font-normal text-sm text-[#574DFF]">Accept</p>
              <span>{items.chevron}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";

export const Cards = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await api.get(`/api/restaurant-manager/show-get-started`),

    queryKey: ["show"],
  });

  const list = [
    {
      title: "Restaurant Overview",
      details:
        "Give an overview about the delights of your restaurant and menu",
      icon: "/dashboard/overview.svg",
      link: "/get-started/overview",
      completed: data?.data?.data?.data?.restaurantOverviewCompleted
        ? "Completed"
        : "Incomplete",
      done: data?.data?.data?.data?.restaurantOverviewCompleted,
    },
    {
      title: "Add first menu",
      details: "Display available meals along with their respective prices.",
      icon: "/dashboard/menu.svg",
      link: "/get-started/menu",
      completed: data?.data?.data?.data?.firstMenuCompleted
        ? "Completed"
        : "Incomplete",
      done: data?.data?.data?.data?.firstMenuCompleted,
    },
    {
      title: "Add photos",
      details:
        "Share captivating images to display your restaurant’s charm and attract customers.",
      icon: "/dashboard/upload.svg",
      link: "/get-started/photos",
      completed: data?.data?.data?.data?.photosCompleted
        ? "Completed"
        : "Incomplete",
      done: data?.data?.data?.data?.photosCompleted,
    },
  ];
  const { push } = useRouter();
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5  ">
        {list.map(({ title, details, icon, link, completed, done }, idx) => (
          <div
            onClick={() => push(link)}
            key={idx}
            className="flex flex-col gap-4 lg:py-[40px] py-[20px] lg:px-8 px-[20px] bg-[#F9FAFB] rounded-2xl border border-grayHeader cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Image src={icon} width={24} height={24} alt="restaurants" />

              <p
                className={`${
                  done
                    ? "text-green-400 bg-[#ECFDF3]"
                    : "text-red-400 bg-[#fdecec]"
                } w-fit py-1 px-2 rounded-[16px]`}
              >
                {completed}
              </p>
            </div>
            <h3 className="font-bold text-comment text-xl">{title}</h3>
            <p className="font-normal text-base text-grayInactive">{details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

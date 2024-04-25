"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export const Cards = ({sectionComp}: any) => {
  const list = [
    {
      title: "Restaurant Overview",
      details:
        "Give an overview about the delights of your restaurant and menu",
      icon: "/dashboard/overview.svg",
      link: "/get-started/overview",
      isComplete:  sectionComp.restaurantOverviewCompleted
    },
    {
      title: "Add first menu",
      details: "Display available meals along with their respective prices.",
      icon: "/dashboard/menu.svg",
      link: "/get-started/menu",
      isComplete:  sectionComp.firstMenuCompleted
    },
    {
      title: "Add photos",
      details:
      "Share captivating images to display your restaurant’s charm and attract customers.",
      icon: "/dashboard/upload.svg",
      link: "/get-started/photos",
      isComplete:  sectionComp.photosCompleted
    },
  ];
  const { push } = useRouter();
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 gap-5  ">
        {list.map(({ title, details, icon, link, isComplete }) => (
          <div
            onClick={() => push(link)}
            key={title}
            className="flex flex-col gap-4 py-[40px] px-8 bg-[#F9FAFB] rounded-2xl border border-grayHeader cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Image src={icon} width={24} height={24} alt="restaurants" />
              <p className={`${isComplete ? 'text-green-700 bg-green-100 p-2 text-xs rounded-full' : 'text-red-700 bg-red-100 p-2 text-xs rounded-full'}`}>{isComplete? 'Completed': 'Incomplete'}</p>
            </div>
            <h3 className="font-bold text-comment text-xl">{title}</h3>
            <p className="font-normal text-base text-grayInactive">{details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

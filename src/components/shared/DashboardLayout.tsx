"use client";
import React from "react";
import { Header } from "./DashoardHeader";
import { Category, Home2, People, Reserve, Wallet } from "iconsax-react";
import { Wine } from "lucide-react";
import { Isidebar } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "@mantine/core";
import { usePathname } from "next/navigation";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sideBar: Isidebar[] = [
    { name: "Get started", link: "/get-started", icon: <Category size="18" /> },
    { name: "Dashboard", link: "/dashboard", icon: <Home2 size="18" /> },
    { name: "Reservation", link: "/reservation", icon: <Wine size={18} /> },
    { name: "Menu", link: "/menu", icon: <Reserve size="18" /> },
    { name: "Guest Book", link: "/guest-book", icon: <People size="18" /> },
    { name: "Marketting", link: "/marketting", icon: <People size="18" /> },
    { name: "Team", link: "/team", icon: <People size="18" /> },
  ];
  const pathName = usePathname();

  return (
    <section className="flex items-start w-full h-screen">
      <div className="h-full w-[240px] bg-[#121212] flex flex-col items-center py-10 gap-20">
        <figure>
          <Image
            src="/dashboard/logo.svg"
            width={100}
            height={100}
            alt="Logo"
          />
        </figure>
        <div className="flex flex-col gap-5">
          {sideBar.map(({ name, link, icon }) => (
            <Link
              href={link}
              key={name}
              className={clsx(
                link === pathName
                  ? "text-[#574DFF] border border-grayoutline rounded-[20px] bg-gray py-3 px-4 text-base font-medium"
                  : "text-base font-medium text-white border-none bg-none"
              )}
            >
              <div className="flex items-center gap-4">
                <span>{icon}</span>
                <span>{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-full flex-1">
        <Header />
        {children}
      </div>
    </section>
  );
};

"use client";
import React from "react";
import { Header } from "./DashoardHeader";
import {
  Category,
  Home2,
  LogoutCurve,
  People,
  Profile,
  ReceiptText,
  Reserve,
  Wallet,
  Wallet3,
} from "iconsax-react";
import { QrCode } from "lucide-react";
import { Isidebar } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "@mantine/core";
import { usePathname } from "next/navigation";
import { UserProvider } from "@/context/restaurant/user";
import { cookieStorage } from "@ibnlanre/portal";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { push } = useRouter();
  const handleLogout = () => {
    cookieStorage.clear();
    push("/");
  };

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await api.get(`/api/restaurant-manager/show-get-started`),

    queryKey: ["show"],
  });
  console.log("get:", data?.data?.data?.data?.showGetStartedPage);

  const sideBar: Isidebar[] = [
    { name: "Get started", link: "/get-started", icon: <Category size="18" /> },

    { name: "Dashboard", link: "/dashboard", icon: <Home2 size="18" /> },
    { name: "Reservation", link: "/reservation", icon: <ReceiptText /> },
    { name: "Menu", link: "/menu", icon: <Reserve size="18" /> },
    {
      name: "QR Code",
      link: "/restaurant-qrcode",
      icon: <QrCode size={18} />,
    },
    { name: "Guest Book", link: "/guest-book", icon: <People size="18" /> },
    // {
    //   name: "Wallet",
    //   link: "/wallet",
    //   icon: <Wallet3 size="18" />,
    // },
    {
      name: "Profile",
      link: "/restaurant-profile",
      icon: <Profile size="18" />,
    },
    {
      name: "Log out",
      link: "/restaurant-dashboard",
      icon: <LogoutCurve size="18" />,
    },
  ];
  const pathName = usePathname();

  return (
    <section className="flex items-start w-full h-screen">
      <div className="w-[240px] bg-[#101323] hidden flex-col items-center py-10 gap-20 lg:flex h-screen overflow-auto">
        <figure>
          <Image
            src="/dashboard/logo.svg"
            width={100}
            height={100}
            alt="Logo"
          />
        </figure>
        <div className="flex flex-col gap-5">
          {data?.data?.data?.data?.showGetStartedPage
            ? sideBar.map(({ name, link, icon }, idx) => (
                <Link
                  onClick={idx === 7 ? handleLogout : undefined}
                  href={link}
                  key={idx}
                  className={clsx(
                    link === pathName
                      ? "text-[#574DFF] outline-none border-[#636C71] rounded-[20px] bg-[#574DFF12]  text-base font-medium"
                      : "text-base font-medium text-white border-none bg-none "
                  )}
                >
                  <div className="flex items-center gap-4 py-[8px] px-[10px]">
                    <span>{icon}</span>
                    <span>{name}</span>
                  </div>
                </Link>
              ))
            : sideBar.slice(1).map(({ name, link, icon }, idx) => (
                <Link
                  onClick={idx === 7 ? handleLogout : undefined}
                  href={link}
                  key={idx}
                  className={clsx(
                    link === pathName
                      ? "text-[#574DFF] outline-none border-[#636C71] rounded-[20px] bg-[#574DFF12]  text-base font-medium"
                      : "text-base font-medium text-white border-none bg-none "
                  )}
                >
                  <div className="flex items-center gap-4 py-[8px] px-[10px]">
                    <span>{icon}</span>
                    <span>{name}</span>
                  </div>
                </Link>
              ))}
          {/* {sideBar.map(({ name, link, icon }, idx) => (
            <Link
              onClick={idx === 7 ? handleLogout : undefined}
              href={link}
              key={idx}
              className={clsx(
                link === pathName
                  ? "text-[#574DFF] outline-none border-[#636C71] rounded-[20px] bg-[#574DFF12]  text-base font-medium"
                  : "text-base font-medium text-white border-none bg-none "
              )}
            >
              <div className="flex items-center gap-4 py-[8px] px-[10px]">
                <span>{icon}</span>
                <span>{name}</span>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto transact-scroll h-screen overflow-hidden">
        <UserProvider>
          <Header />
          {children}
        </UserProvider>
      </div>
    </section>
  );
};

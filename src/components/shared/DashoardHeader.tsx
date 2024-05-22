"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { NotificationBing } from "iconsax-react";
import { User } from "lucide-react";
import { useUser } from "@/context/restaurant/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieStorage } from "@ibnlanre/portal";
import { NotificationDrawer } from "./drawer";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { usePathname } from "next/navigation";
import { Turn as Hamburger } from "hamburger-react";
import Image from "next/image";
import { Isidebar } from "@/types";
import { QrCode } from "lucide-react";
import { clsx } from "@mantine/core";
import {
  Category,
  Home2,
  LogoutCurve,
  People,
  Profile,
  Receipt,
  Reserve,
  Wallet,
  Wallet3,
} from "iconsax-react";
import Link from "next/link";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { fetchUser, restuarantName, managerName } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const sideBar: Isidebar[] = [
    { name: "Get started", link: "/get-started", icon: <Category size="18" /> },

    { name: "Dashboard", link: "/dashboard", icon: <Home2 size="18" /> },
    { name: "Reservation", link: "/reservation", icon: <Receipt size={18} /> },
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

  const [opened, { open, close }] = useDisclosure();
  const pathName = usePathname();
  const { push } = useRouter();
  const handleLogout = () => {
    cookieStorage.clear();
    push("/");
  };

  return (
    <section className="flex lg:flex-row sticky top-0 z-[50] items-center gap-y-4 w-full justify-between py-4 px-4 md:px-8 backdrop-blur-md bg-[#F5F5F5]/50 border-b-[2px] border-grayBottom ">
      <Image
        src="/dashboard/logo.svg"
        alt="img"
        width="80"
        height="80"
        className="lg:hidden"
      />

      <div className="flex items-center">
        <Input
          type="search"
          placeholder="Search keywords"
          className=" px-6 py-6"
        />

        {/* <button
          onClick={handleLogout}
          className="bg-blue-500 p-3 text-white rounded-lg ml-4"
        >
          Logout
        </button> */}
      </div>
      <div className="flex items-center gap-6 place-self-end">
        <div
          onClick={open}
          className="h-[30px] w-[30px] hidden cursor-pointer bg-milky border rounded-full border-grayoutline lg:flex items-center justify-center"
        >
          <NotificationBing size="20" />
        </div>
        <div className="lg:flex items-center gap-3 hidden">
          <div className="h-[30px] w-[30px] border rounded-full border-grayHeader bg-grayHeader flex items-center justify-center ">
            <User size={20} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-comment text-base font-medium">
              {restuarantName}
            </h3>
            <p className="font-normal text-sm text-grayInactive">
              {managerName}
            </p>
          </div>
        </div>
      </div>

      <NotificationDrawer opened={opened} close={close} />

      <div className="lg:hidden z-40 relative">
        <Hamburger toggled={isOpen} toggle={setOpen} size={15} />
      </div>

      {/* Mobile Navs */}
      {isOpen && (
        <div className="lg:hidden absolute top-full bg-[#111323] text-white w-full left-0 p-8">
          <div className="flex justify-between items-center">
            <div className="h-[30px] w-[30px] border rounded-full z-10 border-grayHeader bg-grayHeader flex items-center justify-center ">
              <User size={20} />
            </div>
            {/* <div className="lg:hidden z-40 relative">
              <Hamburger toggled={isOpen} toggle={setOpen} size={15} />
            </div> */}
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-[#FEFEFE] text-lg font-medium">
              {restuarantName}
            </h3>
            <p className="font-normal text-lg text-grayInactive">
              {managerName}
            </p>
          </div>

          <div className="grid gap-y-6 mt-6">
            {sideBar.map(({ name, link, icon }, idx) => (
              <Link
                onClick={idx === 7 ? handleLogout : undefined}
                href={link}
                key={idx}
                className={clsx(
                  link === pathName
                    ? "text-[#574DFF] p-3 outline-none border-[#636C71] rounded-[20px] bg-[#574DFF12] block bg-opacity-10 text-base font-medium"
                    : "text-base font-medium text-white border-none"
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
      )}
    </section>
  );
};

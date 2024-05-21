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
import { Turn as Hamburger } from "hamburger-react";
import Image from "next/image";

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const { fetchUser, restuarantName, managerName } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const [opened, { open, close }] = useDisclosure();

  return (
    <section className="flex lg:flex-row sticky top-0 z-[99] items-center gap-y-4 w-full justify-between py-4 px-4 md:px-8 backdrop-blur-md bg-[#F5F5F5]/50 border-b-[2px] border-grayBottom ">
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

      {/* <NotificationDrawer opened={opened} close={close} /> */}

      <div className="lg:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} size={15} />
      </div>

      {/* Mobile Navs */}
      {isOpen && (
        <div className="lg:hidden absolute top-full bg-[#111323] text-white w-full left-0 p-8">
          this is the page
        </div>
      )}
    </section>
  );
};

"use client";
import React from "react";
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

export const Header = () => {
  const { fetchUser, restuarantName, managerName } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    cookieStorage.clear();
    router.push("/");
  };

  const [opened, { open, close }] = useDisclosure();

  return (
    <section className="flex flex-col lg:flex-row sticky top-0 z-[99] items-center gap-y-4 w-full justify-between py-4 px-4 md:px-8 backdrop-blur-md bg-[#F5F5F5]/50 border-b-[2px] border-grayBottom ">
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
          className="h-[30px] w-[30px] cursor-pointer bg-milky border rounded-full border-grayoutline flex items-center justify-center"
        >
          <NotificationBing size="20" />
        </div>
        <div className="flex items-center gap-3">
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
    </section>
  );
};

"use client";
import React from "react";
import { Input } from "../ui/input";
import { NotificationBing } from "iconsax-react";
import { User } from "lucide-react";
import { useUser } from "@/context/user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cookieStorage } from "@ibnlanre/portal";

export const Header = () => {
  const { getUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    cookieStorage.clear()
    router.push("/");
  };

  return (
    <section className="flex sticky top-0 z-[9999] items-center w-full justify-between py-4 px-8 backdrop-blur-md bg-[#F5F5F5]/50 border-b-[2px] border-grayBottom ">
      <div className="flex items-center">
        <Input
          type="search"
          placeholder="Search for a restaurant, cuisine e.t.c"
          className=" px-6 py-6"
        />

        <button
          onClick={handleLogout}
          className="bg-blue-500 p-3 text-white rounded-lg ml-4"
        >
          Logout
        </button>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-[30px] w-[30px] bg-milky border rounded-full border-grayoutline flex items-center justify-center">
          <NotificationBing size="20" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-[30px] w-[30px] border rounded-full border-grayHeader bg-grayHeader flex items-center justify-center ">
            <User size={20} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-comment text-base font-medium">Restaurant</h3>
            <p className="font-normal text-sm text-grayInactive">
              Olivia Martins
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

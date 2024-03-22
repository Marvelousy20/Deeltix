"use client";
import React from "react";
import { UserRound, Bookmark, ChevronRight } from "lucide-react";
import { ShoppingBag, Note1, LogoutCurve } from "iconsax-react";
import clsx from "clsx";
import { ILoggedinUser } from "@/types";
import Link from "next/link";
import { useUser } from "@/context/user/user";
import { cookieStorage } from "@ibnlanre/portal";

export const MenuDropDown = () => {
  const { setIsLoggedIn } = useUser();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const userDetails: ILoggedinUser[] = [
    {
      name: "My profile",
      icon: <UserRound strokeWidth={1} size={16} color="black" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/profile",
    },
    {
      name: "My orders",
      icon: <ShoppingBag size="16" color="#000000" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/orders",
    },
    {
      name: "My reservations",
      icon: <Note1 size="16" color="#000000" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/user-reservation",
    },
    {
      name: "My bookmarks",
      icon: <Bookmark strokeWidth={1} size={16} color="black" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/bookmark",
    },
    {
      name: "Sign out",
      icon: <LogoutCurve size="16" color="#000000" />,
      chevron: <ChevronRight strokeWidth={1.5} size={18} color="black" />,
      route: "/",
    },
  ];
  return (
    <div className=" bg-white flex flex-col space-y-2 p-3 overflow-hidden">
      {userDetails.map((items, idx) => (
        <Link href={items.route} key={idx}>
          <div className="flex items-center gap-3">
            <div className=" w-6 h-6 flex items-center justify-center rounded-full bg-gray border border-grayoutline">
              {items.icon}
            </div>

            <div
              onClick={() => (idx === 4 ? handleSignOut() : null)}
              className={clsx(
                idx === 4
                  ? "flex items-center justify-between w-[150px]  cursor-pointer py-2 px-1 hover:bg-gray hover:rounded-lg"
                  : "flex items-center justify-between border-b border-grayoutline w-[150px] max-w-[150px] py-2 px-1 cursor-pointer hover:bg-gray hover:rounded-lg"
              )}
            >
              <h3 className=" text-base font-normal text-grayBlack">
                {items.name}
              </h3>
              {items.chevron}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

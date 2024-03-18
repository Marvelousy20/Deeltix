"use client";
import Image from "next/image";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuDropDown } from "./menu-dropdown";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/user/user";
import { cookieStorage } from "@ibnlanre/portal";

export default function LoggedInNavbar() {
  const [rotate, setRotate] = useState<boolean>(false);
  const userDetail = cookieStorage.getItem("user");
  const userName = JSON.parse(userDetail as unknown as string);
  return (
    <div>
      <div className="pt-10 fixed w-full z-50 hidden lg:block">
        <section className="bg-grayblack flex justify-between items-center rounded-[5.5rem] px-8 py-6 mx-20 text-white">
          <Link href="/">
            <Image
              src="/dashboard/logo.svg"
              alt="img"
              width="160"
              height="100"
            />
          </Link>

          {/* location */}
          <div className="flex gap-x-3 items-center">
            <MapPin size={16} />
            <div className="flex gap-x-2 items-center">
              <p className=" text-xl font-normal text-Gainsboro">
                Lekki, Lagos
              </p>
              <div>
                <DropdownMenu
                  onOpenChange={(open) => {
                    open ? setRotate(true) : setRotate(false);
                  }}
                >
                  <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
                    {!rotate ? (
                      <ChevronDown
                        size={20}
                        className="inline !outline-none !border-none"
                      />
                    ) : (
                      <ChevronUp
                        size={20}
                        className="inline !outline-none !border-none"
                      />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
                    <MenuDropDown />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className=" flex items-center space-x-4">
            <div className="h-[40px] w-[40px] flex items-center justify-center text-white text-xl font-normal rounded-full bg-indigo">
              {userName?.user?.profile?.name.slice(0, 1)}
            </div>
            <div>
              <DropdownMenu
                onOpenChange={(open) => {
                  open ? setRotate(true) : setRotate(false);
                }}
              >
                <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
                  {!rotate ? (
                    <ChevronDown
                      size={20}
                      className="inline !border-none !outline-none"
                    />
                  ) : (
                    <ChevronUp
                      size={20}
                      className="inline !border-none !outline-none"
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
                  <MenuDropDown />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
      </div>

      {/* mobile navbar */}
      <section className="flex flex-col gap-6 lg:hidden">
        <div className="flex gap-x-3 items-center">
          <MapPin size={16} color="white" />
          <div className="flex gap-x-2 items-center">
            <p className=" text-xl font-normal text-Gainsboro">Lekki, Lagos</p>
            <div>
              <DropdownMenu
                onOpenChange={(open) => {
                  open ? setRotate(true) : setRotate(false);
                }}
              >
                <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
                  {!rotate ? (
                    <ChevronDown
                      color="white"
                      size={20}
                      className="inline !outline-none !border-none"
                    />
                  ) : (
                    <ChevronUp
                      color="white"
                      size={20}
                      className="inline !outline-none !border-none"
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
                  <MenuDropDown />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className=" flex items-center space-x-4">
          <div className="h-[40px] w-[40px] flex items-center justify-center text-white text-xl font-normal rounded-full bg-indigo">
            A
          </div>
          <div>
            <DropdownMenu
              onOpenChange={(open) => {
                open ? setRotate(true) : setRotate(false);
              }}
            >
              <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
                {!rotate ? (
                  <ChevronDown
                    color="white"
                    size={20}
                    className="inline !border-none !outline-none"
                  />
                ) : (
                  <ChevronUp
                    color="white"
                    size={20}
                    className="inline !border-none !outline-none"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
                <MenuDropDown />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>
    </div>
  );
}

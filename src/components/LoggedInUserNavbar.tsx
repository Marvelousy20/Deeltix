"use client";
import Image from "next/image";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuDropDown } from "./menu-dropdown";
import { useState } from "react";
import clsx from "clsx";

export default function LoggedInNavbar() {
  const [rotate, setRotate] = useState<boolean>(false);

  const handleRotate = () => {
    setRotate(!rotate);
    console.log("true");
  };

  return (
    <div className="pt-10 fixed w-full z-50 ">
      <nav className="bg-grayblack flex justify-between items-center rounded-[5.5rem] px-8 py-6 mx-20 text-white">
        <div>
          <Image src="/dashboard/logo.svg" alt="img" width="80" height="80" />
        </div>

        {/* location */}
        <div className="flex gap-x-3 items-center">
          <MapPin size={16} />
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
      </nav>
    </div>
  );
}

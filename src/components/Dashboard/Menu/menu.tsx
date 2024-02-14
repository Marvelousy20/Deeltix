"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuDropDown } from "./menudropdown";
import { MoreHorizontal } from "lucide-react";
export const MenuDetails = () => {
  return (
    <div>
      <div className="rounded-[32px]">
        <DropdownMenu>
          <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
            <MenuDropDown />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

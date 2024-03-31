"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuDetails } from "./menu";
import { MenuType } from "@/types";

export const menuColumns: ColumnDef<MenuType>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original;
      return (
        <div>
          <Avatar>
            <AvatarImage src={image?.image as string} alt="menu" />
            <AvatarFallback>MN</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          {/* onclick of this will console the user id based on the role you clicked */}
          <MenuDetails id={user.id} restaurantId={user.restaurant} />
          {/* <MoreHorizontal onClick={() => console.log(user.id)} /> */}
        </div>
      );
    },
  },
];

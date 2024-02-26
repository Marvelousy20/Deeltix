"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuDetails } from "./menu";
import { MenuType } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type menu = {
//   id: number;
//   name: string;
//   description: string;
//   price: string;

//   category: string;
// };

export const menuData = [
  {
    id: 1,
    name: "Goat meat",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    category: "Breakfast",
  },
  {
    id: 2,
    name: "Goat meat",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    category: "Breakfast",
  },
  {
    id: 3,
    name: "Chicken",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    category: "Breakfast",
  },
  {
    id: 4,
    name: "Turkey",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    category: "Breakfast",
  },
  {
    id: 5,
    name: "snail",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    category: "Breakfast",
  },
];

export const menuColumns: ColumnDef<MenuType>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const details = row.original;
      return (
        <div>
          <Avatar>
            <AvatarImage src="/menu.png" alt="menu" />
            <AvatarFallback>GM</AvatarFallback>
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
          <MenuDetails id = {user.id} restaurantId = {user.restaurant} />
          {/* <MoreHorizontal onClick={() => console.log(user.id)} /> */}
        </div>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { useDisclosure } from "@mantine/hooks";
import { Guest } from "@/types";
import { ModalEvent } from "./event";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type user = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
};

export const guestData = [
  {
    id: 1,
    fullName: "Olivia Martins",
    email: "fiyin@gmail.com",
    phoneNumber: "09023060000",
  },
  {
    id: 2,
    fullName: "Olivia Fiyin",
    email: "fiyin@gmail.com",
    phoneNumber: "09023060000",
  },
  {
    id: 3,
    fullName: "Olivia cisco",
    email: "fiyin@gmail.com",
    phoneNumber: "09023060000",
  },
  {
    id: 3,
    fullName: "Olivia Esther",
    email: "fiyin@gmail.com",
    phoneNumber: "09023060000",
  },
];

export const guestColumns: ColumnDef<Guest>[] = [
  {
    accessorKey: "fullName",
    header: "Full name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <ModalEvent
            user={user?.fullName as string}
            email={user?.email as string}
            number={user?.phoneNumber as string}
          />
          {/* <ModalDetails id={user?._id} /> */}
          {/* onclick of this will console the user id based on the role you clicked */}
          {/* <MoreHorizontal onClick={() => console.log(user)} /> */}
        </div>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import ModalDetails from "./modal";
import { useDisclosure } from "@mantine/hooks";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type user = {
  id: number;
  fullname: string;
  email: string;
  number: string;
};

export const guestData = [
  {
    id: 1,
    fullname: "Olivia Martins",
    email: "fiyin@gmail.com",
    number: "09023060000",
  },
  {
    id: 2,
    fullname: "Olivia Fiyin",
    email: "fiyin@gmail.com",
    number: "09023060000",
  },
  {
    id: 3,
    fullname: "Olivia cisco",
    email: "fiyin@gmail.com",
    number: "09023060000",
  },
  {
    id: 3,
    fullname: "Olivia Esther",
    email: "fiyin@gmail.com",
    number: "09023060000",
  },
];

export const guestColumns: ColumnDef<user>[] = [
  {
    accessorKey: "fullname",
    header: "Full name",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Fullname
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "number",
    header: "Phone Number",
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <ModalDetails />
          {/* onclick of this will console the user id based on the role you clicked */}
          {/* <MoreHorizontal onClick={() => console.log(user.id)} /> */}
        </div>
      );
    },
  },
];

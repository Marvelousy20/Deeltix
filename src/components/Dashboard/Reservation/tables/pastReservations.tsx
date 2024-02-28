"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal, ArrowUpDown } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MenuDetails } from "../../Menu/menu";
// import { MenuType } from "@/types";

type Test = {
  id: number;
  name: string;
  price: string;
  reservationCode: string;
  reservedDate: string;
  date: string;
};

export const pastReservationsData = [
  {
    id: 1,
    name: "Olivia Martins",
    price: "₦5,000.00",
    reservedDate: "21st Jan, 2023",
    reservationCode: "VFHGHG23",
    date: "21st Jan, 2023",
  },
  {
    id: 2,
    name: "Olivia Martins",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    reservedDate: "21st Jan, 2023",
    reservationCode: "VFHGHG23",
    date: "21st Jan, 2023",
  },
  {
    id: 3,
    name: "Olivia Martins",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    reservedDate: "21st Jan, 2023",
    reservationCode: "VFHGHG23",
    date: "21st Jan, 2023",
  },
  {
    id: 4,
    name: "Olivia Martins",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    reservedDate: "21st Jan, 2023",
    reservationCode: "VFHGHG23",
    date: "21st Jan, 2023",
  },
  {
    id: 5,
    name: "Olivia Martins",
    description: "Blended ingredients for a tasteful experience",
    price: "₦5,000.00",
    reservedDate: "21st Jan, 2023",
    reservationCode: "VFHGHG23",
    date: "21st Jan, 2023",
  },
];

export const pastReservationsColumn: ColumnDef<Test>[] = [
  //   {
  //     id: "image",
  //     header: "Image",
  //     cell: ({ row }) => {
  //       const details = row.original;
  //       return (
  //         <div>
  //           <Avatar>
  //             <AvatarImage src="/menu.png" alt="menu" />
  //             <AvatarFallback>GM</AvatarFallback>
  //           </Avatar>
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "reservedDate",
    header: "Reserved date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "reservationCode",
    header: "Reservation Code",
  },
];
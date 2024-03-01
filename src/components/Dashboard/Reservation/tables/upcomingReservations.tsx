"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

type Test = {
  id: number;
  name: string;
  price: string;
  reservationCode: string;
  reservedDate: string;
  date: string;
};

export const upcomingReservationsData = [
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

export const upcomingReservationsColumn: ColumnDef<Test>[] = [
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
    header: "Reserved Code",
  },

  {
    accessorKey: "confirm",
    header: "Confirm Reservation",
    cell: ({ row }) => {
      return (
        <button className="text-[#574DFF] bg-[#F4F5FF] rounded-[40px] py-2 px-4">
          Confirm
        </button>
      );
    },
  },

  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          {/* onclick of this will console the user id based on the role you clicked */}
          {/* <MenuDetails id={user.id} restaurantId={user.restaurant} /> */}
          <MoreHorizontal onClick={() => console.log(user.id)} />
        </div>
      );
    },
  },
];

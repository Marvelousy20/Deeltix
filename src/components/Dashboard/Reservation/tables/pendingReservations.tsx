"use client";

import { ReservationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ReservationDetails } from "../dropdown-details";

type Test = {
  id: number;
  name: string;
  price: string;
  reservationCode: string;
  reservedDate: string;
  date: string;
};

export const pendingReservationData = [
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

export const pendingReservationsColumn: ColumnDef<ReservationStatus>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const user = row?.original;
      return <p>{dayjs(user?.createdAt).format("DD-MM-YYYY")}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Reserved date",
    cell: ({ row }) => {
      const user = row?.original;

      return (
        <>
          <p>{dayjs(user?.date).format("DD-MM-YYYY")}</p>
          <p>{user.time}</p>
        </>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "reference",
    header: "Reservation Code",
  },

  {
    accessorKey: "confirmationStatus",
    header: "Confirm Status",
    cell: ({ row }) => {
      const user = row?.original;
      return (
        <>
          <button className="text-[#574DFF] bg-[#F4F5FF] rounded-[40px] py-2 px-4">
            {user?.confirmationStatus}
          </button>
        </>
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
          <ReservationDetails reservationId={user?.id} />
          {/* onclick of this will console the user id based on the role you clicked */}
          {/* <MenuDetails id={user.id} restaurantId={user.restaurant} /> */}
          {/* <MoreHorizontal onClick={() => console.log(user.id)} /> */}
        </div>
      );
    },
  },
];

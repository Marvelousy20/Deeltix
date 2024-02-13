"use client";
import { ColumnDef } from "@tanstack/react-table";

export interface Iinvoice {
  id: number;
  date: string;
  amount: string;
  type: string;
}

export const transactionData = [
  {
    id: 1,
    date: "21st Jan, 2023",
    amount: "₦100",
    type: "serviceCharge",
  },
  {
    id: 2,
    date: "21st Jan, 2023",
    amount: "₦100",
    type: "serviceCharge",
  },
  {
    id: 3,
    date: "21st Jan, 2023",
    amount: "₦100",
    type: "serviceCharge",
  },
  {
    id: 4,
    date: "21st Jan, 2023",
    amount: "₦100",
    type: "serviceCharge",
  },
  {
    id: 5,
    date: "21st Jan, 2023",
    amount: "₦100",
    type: "serviceCharge",
  },
];
export const transactionColumns: ColumnDef<Iinvoice>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];

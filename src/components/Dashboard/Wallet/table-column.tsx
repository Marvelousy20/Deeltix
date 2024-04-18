"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuType } from "@/types";
export interface IWallet {
  id: number;
  date: string;
  recipient: string;
  type: string;
  amount: string;
}

export const walletData = [
  {
    id: 1,
  date: "21st Jan, 2023",
    recipient: "Olivia Martins",
    type: "Withdraw",
    amount: "₦10,000.00",
  },
  {
    id: 2,
    date: "21st Jan, 2023",
    recipient: "Olivia Martins",
    type: "Withdraw",
    amount: "₦10,000.00",
  },
  {
    id: 3,
    date: "21st Jan, 2023",
    recipient: "Olivia Martins",
    type: "Withdraw",
    amount: "₦10,000.00",
  },
  {
    id: 4,
    date: "21st Jan, 2023",
    recipient: "Olivia Martins",
    type: "Withdraw",
    amount: "₦10,000.00",
  },
];

export const walletColumns: ColumnDef<IWallet>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { UpcomingDropDown } from "./upcoming-dropdown";

export const UpcomingDetails = ({
  reservationId,
  user,
  email,
  number,
  date,
  time,
  guest,
  request,
  status,
}: {
  reservationId: string;
  user: string;
  email: string;
  number: string;
  date: string;
  time: string;
  guest: number;
  request: string;
  status: string;
}) => {
  return (
    <div>
      <div className="rounded-[32px]">
        <DropdownMenu>
          <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
            <UpcomingDropDown
              reservationId={reservationId}
              user={user}
              email={email}
              number={number}
              date={date}
              time={time}
              guest={guest}
              request={request}
              status={status}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

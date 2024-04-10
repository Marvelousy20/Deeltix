"use client";
import { Edit2, SearchStatus1 } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";
import { ReminderNotification } from "./reminder-modal";
import { useDisclosure } from "@mantine/hooks";
import { Mail } from "lucide-react";
import { ViewReservationModal } from "./modal";

export const UpcomingDropDown = ({
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
  const { push } = useRouter();
  const [opened, { open, close }] = useDisclosure();
  return (
    <div>
      <section className="p-[15px] flex flex-col w-full">
        <div className="flex cursor-pointer items-center gap-3 border-b border-[#E7EAF1] pb-[12px]">
          <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
            <SearchStatus1 size={20} />
          </div>
          <p className="text-base font-medium text-[#2C2929]">
            <ViewReservationModal
              user={user}
              email={email}
              date={date}
              status={status}
            />
          </p>
        </div>

        <div className="flex cursor-pointer items-center gap-3 pt-[12px]">
          <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
            <Mail size={20} />
          </div>
          <p className="text-base font-medium text-[#2C2929]">
            <ReminderNotification
              user={user}
              email={email}
              number={number}
              date={date}
              time={time}
              guest={guest}
              request={request}
              reservationId={reservationId}
            />
          </p>
        </div>
      </section>
    </div>
  );
};

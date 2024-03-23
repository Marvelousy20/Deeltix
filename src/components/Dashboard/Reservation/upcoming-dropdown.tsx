"use client";
import { Edit2, SearchStatus1 } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";
import { ReminderNotification } from "./reminder-modal";
import { useDisclosure } from "@mantine/hooks";
import { Mail } from "lucide-react";

export const UpcomingDropDown = ({
  reservationId,
  user,
  email,
  number,
  date,
  time,
  guest,
  request,
}: {
  reservationId: string;
  user: string;
  email: string;
  number: string;
  date: string;
  time: string;
  guest: number;
  request: string;
}) => {
  const { push } = useRouter();
  const [opened, { open, close }] = useDisclosure();
  return (
    <section className=" p-[15px] flex flex-col">
      <div className="flex cursor-pointer items-center gap-3 border-b border-[#E7EAF1] pb-[12px]">
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <SearchStatus1 size={20} />
        </div>
        <p className="text-base font-medium text-[#2C2929]">View</p>
      </div>
      <div className="flex cursor-pointer items-center gap-3 border-b border-[#E7EAF1] py-[12px]">
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <Edit2 size={20} />
        </div>
        <p className="text-base font-medium text-[#2C2929]">Edit</p>
      </div>
      <div className="flex cursor-pointer items-center gap-3 pt-[12px]">
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <Mail size={20} onClick={open} />
        </div>
        <p className="text-base font-medium text-[#2C2929]">Send reminder</p>
      </div>
      <ReminderNotification
        opened={opened}
        close={close}
        user={user}
        email={email}
        number={number}
        date={date}
        time={time}
        guest={guest}
        request={request}
        reservationId={reservationId}
      />
    </section>
  );
};

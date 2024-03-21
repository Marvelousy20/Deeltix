"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { PendingReservationDetails } from "@/types";
import ReservationCard from "./card";
import { EmptyState } from "./empty-state";
import { useUser } from "@/context/restaurant/user";

export const UpcomingReservation = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<PendingReservationDetails>(
        `/api/reservations/upcoming/all`
      ),
    queryKey: ["upcoming-reservation"],
    select: ({ data }) => data?.data?.data?.reservations,
  });

  return (
    <div className="bg-white pt-20 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <h3 className=" text-2xl font-normal text-dark2">
          Upcoming reservation
        </h3>
        <section className="w-full flex items-start p-6 border border-grayoutline rounded-[32px]">
          {data?.length ? <ReservationCard data={data} /> : <EmptyState />}
        </section>
      </div>
    </div>
  );
};

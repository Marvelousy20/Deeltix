"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { PendingReservationDetails } from "@/types";
import ReservationCard from "./card";
import { EmptyState } from "./empty-state";

export const PendingReservation = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<PendingReservationDetails>(
        `/api/reservations/all?confirmationStatus=In-review`
      ),
    queryKey: ["pending-reservation"],
    select: ({ data }) => data?.data?.data?.reservations,
  });

  return (
    <div className="bg-white pt-20 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <h3 className=" text-2xl font-normal text-dark2">
          Pending reservation
        </h3>
        <section className="w-full flex items-start p-6 border border-grayoutline rounded-[32px]">
          {data?.length ? <ReservationCard data={data} /> : <EmptyState />}
        </section>
      </div>
    </div>
  );
};

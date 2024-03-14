"use client";
import React from "react";
import ReservationCard from "./card";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";

export const UpcomingReservation = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await auth.get(`/api/reservations/all`),
    queryKey: ["upcoming-reservation"],
  });

  return (
    <div className="flex flex-col w-full h-full lg:pt-[56px] pt-6 bg-white">
      <section className="w-[90%] mx-auto">
        <h3 className=" text-4xl font-medium text-start pb-8 text-dark2">
          Upcoming reservations
        </h3>
        <div className="">
          <div className="flex flex-col w-full gap-10 border border-grayoutline rounded-[32px] p-8">
            <ReservationCard data={[]} />
            <p>adeola</p>
          </div>
        </div>
      </section>
    </div>
  );
};

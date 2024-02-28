"use client";
import Image from "next/image";
import EmptyReservations from "./EmptyReservations";
import { DataTable } from "@/components/Table/DataTable";
import { pendingReservationData } from "./tables/pendingReservations";
import { pendingReservationsColumn } from "./tables/pendingReservations";
import {
  pastReservationsData,
  pastReservationsColumn,
} from "./tables/pastReservations";
import {
  upcomingReservationsColumn,
  upcomingReservationsData,
} from "./tables/upcomingReservations";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const reservations = [{ id: 1 }];

export default function Reservation() {
  // const [reservations, setReservation] = useState("")

  return (
    <div className="pt-5 px-8">
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Reservations</h3>
          <p className="font-normal text-base text-[#636C71]">
            Manage your restaurants reservations
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#574DFF] rounded-[40px]">
          {/* <PlusCircle color="#F0F3F8" /> */}
          <Button className="text-[#F0F3F8] text-sm font-medium flex items-center gap-x-1">
            <Image
              src="/restaurants/reservations/reserve.svg"
              alt="reserve"
              width={16}
              height={16}
            />
            Book Reservation
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-3 mt-4">
        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>Total Reservations</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">550</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>

        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>All time seated guests</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">425</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>

        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>Upcoming Reservation</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">5</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>
      </section>

      <section>
        {reservations.length >= 1 ? (
          <div>
            {/* Pending Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Pending Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={pendingReservationsColumn}
                  data={pendingReservationData}
                />
              </div>
            </div>

            {/* Upcoming Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Upcoming Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={upcomingReservationsColumn}
                  data={upcomingReservationsData}
                />
              </div>
            </div>

            {/* Past Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Past Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={pastReservationsColumn}
                  data={pastReservationsData}
                />
              </div>
            </div>
          </div>
        ) : (
          <EmptyReservations />
        )}
      </section>
    </div>
  );
}

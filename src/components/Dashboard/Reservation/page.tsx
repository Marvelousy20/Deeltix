"use client";
import Image from "next/image";
import EmptyReservations from "./EmptyReservations";
import { DataTable } from "@/components/Table/DataTable";
import { pendingReservationsColumn } from "./tables/pendingReservations";
import { pastReservationsColumn } from "./tables/pastReservations";
import { upcomingReservationsColumn } from "./tables/upcomingReservations";
import Link from "next/link";
import { useUser } from "@/context/restaurant/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { ReservationStat, UpcomingReservationDetails } from "@/types";

const reservations = [{ id: 1 }];

export default function Reservation() {
  const { restaurantId } = useUser();

  // reservation stat
  const { data: stat, isLoading: statloading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      return await api.get<ReservationStat>(
        `/api/reservations/${restaurantId}/stats`
      );
    },
    queryKey: ["reservation-stat", "stat"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  //  upcoming reservation
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      return await api.get<UpcomingReservationDetails>(
        `/api/reservations/${restaurantId}/manager/upcoming/all`
      );
    },
    queryKey: ["upcoming-reservation", "upcoming"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  console.log(data);

  // past reservation
  const { data: pastReservation, isLoading: pastLoading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      return await api.get<UpcomingReservationDetails>(
        `/api/reservations/${restaurantId}/manager/past/all`
      );
    },
    queryKey: ["past-reservation", "past"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  // Pending reservation
  const { data: pendingReservation, isLoading: pendingLoading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      return await api.get<UpcomingReservationDetails>(
        `/api/reservations/${restaurantId}/manager/all?confirmationStatus=In-review`
      );
    },
    queryKey: ["pending-reservation", "pending"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  console.log("past-reservation: ", pastReservation);
  return (
    <div className="pt-5 px-8">
      <section className="flex flex-col lg:flex-row lg:items-center gap-y-2 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Reservations</h3>
          <p className="font-normal text-sm lg:text-base text-[#636C71]">
            Manage your restaurants reservations
          </p>
        </div>
        <div className="flex items-center justify-center lg:justify-start mt-4 lg:mt-0 px-4 py-3 gap-2 bg-[#574DFF] rounded-[40px]">
          {/* <PlusCircle color="#F0F3F8" /> */}
          <Link
            href="/reservation/create"
            className="text-[#F0F3F8] text-sm font-medium flex items-center gap-x-1"
          >
            <Image
              src="/restaurants/reservations/reserve.svg"
              alt="reserve"
              width={16}
              height={16}
            />
            Book Reservation
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 mt-8 lg:mt-4">
        <div className="flex justify-between border border-[#EAECF0] col-span-1 px-10 py-5 lg:p-10">
          <div>
            <h2>Total Reservations</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">
              {stat?.totalReservations}
            </p>
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

        <div className="flex justify-between border border-[#EAECF0] col-span-1 px-10 py-5 lg:p-10">
          <div>
            <h2>All time seated guests</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">
              {stat?.totalGuests}
            </p>
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

        <div className="flex justify-between border border-[#EAECF0] col-span-1 px-10 py-5 lg:p-10">
          <div>
            <h2>Upcoming Reservation</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">
              {stat?.totalUpcomingReservations}
            </p>
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
            {/* pending Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Pending Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={pendingReservationsColumn}
                  data={pendingReservation?.reservations ?? []}
                />
              </div>
            </div>

            {/* Upcoming Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Upcoming Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={upcomingReservationsColumn}
                  data={data?.reservations ?? []}
                />
              </div>
            </div>

            {/* Past Reservations */}
            <div className="mt-8">
              <h1 className="p-5 font-medium text-lg">Past Reservations</h1>
              <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
                <DataTable
                  columns={pastReservationsColumn}
                  data={pastReservation?.reservations ?? []}
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

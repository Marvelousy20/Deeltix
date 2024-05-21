"use client";
import React from "react";
import { Headings } from "../GetStarted/Headings";
import { DashboardReservation } from "./UpcomingReservation";
import { Guest } from "./RecentGuest";
import { DataTable } from "@/components/Table/DataTable";
import { transactionColumns, transactionData } from "./TransactionTable";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useUser } from "@/context/restaurant/user";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/axios-config";
import AreaChartComponent from "./Chart";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const { restaurantId, restuarantName } = useUser();

  // daily stat
  const { data: daily_stat, isLoading: daily_statloading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      // return await api.get<ReservationStat>(
      return await api.get(`/api/restaurants/${restaurantId}/daily-stats`);
    },
    queryKey: ["daily-stat", "stat"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  // weekly stat
  const { data: weekly_stat, isLoading: weekly_statloading } = useQuery({
    queryFn: async () => {
      if (!restaurantId) {
        return;
      }
      // return await api.get<ReservationStat>(
      return await api.get(`/api/reservations/${restaurantId}/chart/weekly`);
    },
    queryKey: ["weekly-stat", "stat"],
    enabled: !!restaurantId,
    select: (data) => data?.data?.data?.data,
  });

  const sales = [
    {
      sale: "Total revenue",
      amount: daily_stat ? `${daily_stat?.stats.totalRevenue}` : "0",
      percentage: "10% from yesterday",
      arrow: <ArrowDownRight color="#F71616" />,
    },
    {
      sale: "Page view",
      amount: daily_stat ? `${daily_stat?.stats.pageViews}` : "0",
      percentage: "10% from yesterday",
      arrow: <ArrowUpRight color="#1DA533" />,
    },
  ];

  const user = [
    {
      type: "Reservation",
      amount: daily_stat ? `${daily_stat?.stats.totalReservationCount}` : "0",
    },
    {
      type: "Customer",
      amount: daily_stat ? `${daily_stat?.stats.upcomingReservations}` : "0",
    },
  ];

  return (
    <div className="px-5 my-6 lg:mt-0 lg:p-8 flex flex-col gap-8">
      <section className="lg:flex space-y-[24px] lg:space-y-0 w-full items-center lg:justify-between justify-normal">
        <Headings
          user={"Olivia"}
          detail={`Here's the update with ${restuarantName} 🥙`}
          // detail={`Here’s the update with `}
        />
        <Button className="text-sm font-normal cursor-pointer text-white  bg-[#121212] rounded-[20px] py-2 px-3 w-full lg:w-fit">
          Download sales report
        </Button>
        {/* <div className="w-fit text-sm font-normal cursor-pointer text-white  bg-[#121212] rounded-[20px] py-2 px-3">
          Download sales report
        </div> */}
      </section>
      {/* Chart and stat */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <section className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {sales.map((item, _idx) => (
            <div
              key={_idx}
              className="border rounded-lg border-[#0000001A] bg-[#F9F9F9] p-6"
            >
              <section className="flex flex-col">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-normal text-grayInactive">
                    {item.sale}
                  </p>
                  <h3 className="font-medium pt-3 pb-2 text-3xl text-[#000000]">
                    {item.amount}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <div>{item.arrow}</div>
                  <p className="font-normal text-sm text-[#000000]">
                    {item.percentage}
                  </p>
                </div>
              </section>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {user.map((item, _idx) => (
            <div
              key={_idx}
              className="border rounded-lg border-[#0000001A] bg-[#F9F9F9] p-6"
            >
              <section className="flex flex-col gap-3">
                <p className="text-sm font-normal text-grayInactive ">
                  {item.type}
                </p>
                <h3 className="font-medium text-3xl text-[#000000]">
                  {item.amount}
                </h3>
              </section>
            </div>
          ))}
        </section>
      </div>

      <div className="h-[348px] lg:h-[450px] w-full border border-grayBottom rounded-[20px] pt-4 lg:pt-6 lg:px-6">
        <AreaChartComponent stats={weekly_stat?.output} />
      </div>

      {/* <section className="grid grid-cols-2 gap-8">
        <DashboardReservation />
        <div className="border-[2px] border-[#F7F7F7] rounded-[24px] w-full">
          <div className="flex items-center justify-between py-[20px] px-[18px]">
            <p className="font-medium text-xl text-[#101828]">Transaction</p>
            <p className="text-sm font-normal text-[#574DFF] cursor-pointer">
              View all
            </p>
          </div>
          <DataTable columns={transactionColumns} data={transactionData} />
        </div>
      </section> */}
    </div>
  );
};

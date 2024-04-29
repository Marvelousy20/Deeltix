import React from "react";
import { Headings } from "../GetStarted/Headings";
import { DashboardReservation } from "./UpcomingReservation";
import { Guest } from "./RecentGuest";
import { DataTable } from "@/components/Table/DataTable";
import { transactionColumns, transactionData } from "./TransactionTable";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import AreaChartComponent from "../Chart";

export interface IStat {
  title: string;
  data: string;
}
export const Dashboard = () => {
  const sales = [
    {
      sale: "Gross sales",
      amount: "540,432.50",
      percentage: "10% from yesterday",
      arrow: <ArrowUpRight color="#1DA533" />,
    },
    {
      sale: "Total revenue",
      amount: "30,647.00",
      percentage: "10% from yesterday",
      arrow: <ArrowDownRight color="#F71616" />,
    },
  ];

  const user = [
    {
      type: "Reservation",
      amount: "500",
    },
    {
      type: "Customer",
      amount: "50",
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-8">
      <section className="flex items-center justify-between">
        <Headings
          user={"Olivia"}
          detail={"Here’s the update with Cilantro 🥙"}
        />
        <div className="w-fit text-sm font-normal text-white  bg-[#121212] rounded-[20px] py-2 px-3">
          Download sales report
        </div>
      </section>
      {/* Chart and stat */}
      <div className="grid grid-cols-2 gap-6">
        <section className="grid grid-cols-2 gap-6">
          {sales.map((item, _idx) => (
            <div
              key={_idx}
              className="border border-[#0000001A] bg-[#F9F9F9] p-6"
            >
              <section className="flex flex-col">
                <p className="text-sm font-normal text-grayInactive">
                  {item.sale}
                </p>
                <h3 className="font-medium pt-3 pb-2 text-3xl text-[#000000]">
                  {item.amount}
                </h3>
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

        <section className="grid grid-cols-2 gap-6">
          {user.map((item, _idx) => (
            <div
              key={_idx}
              className="border border-[#0000001A] bg-[#F9F9F9] p-6"
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

      <div className="h-[350px] w-full border border-grayBottom rounded-[20px] p-[24px]">
        <AreaChartComponent />
      </div>

      <section className="grid grid-cols-2 gap-8">
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
      </section>
    </div>
  );
};

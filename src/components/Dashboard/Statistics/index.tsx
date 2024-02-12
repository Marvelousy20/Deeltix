import React from "react";
import { Headings } from "../GetStarted/Headings";
import { DashboardReservation } from "./UpcomingReservation";
import { Guest } from "./RecentGuest";
import { StatTransactionTable } from "./TransactionTable";
import { MantineTableee } from "./MantineTable";

export interface IStat {
  title: string;
  data: string;
}
export const Dashboard = () => {
  const result: IStat[] = [
    { title: "Page view", data: "52" },
    { title: "Upcoming reservation", data: "16" },
  ];
  return (
    <div className="p-8 flex flex-col gap-8">
      <Headings user={"Olivia"} detail={"Here’s the update with Cilantro 🥙"} />

      {/* Chart and stat */}
      <section className="flex items-start gap-8">
        <div className="h-[350px] w-[70%] border border-grayBottom rounded-[20px] p-[24px]"></div>
        <div className="w-[30%] flex flex-col gap-[24px] p-[20px] rounded-[20px] border border-grayBottom">
          <div className="flex items-center justify-between ">
            <h3 className="font-medium text-xl text-[#42474B]">Stats</h3>
            <div>Date</div>
          </div>

          <section className="flex flex-col gap-2">
            <div className="flex gap-2">
              {result.map((item, _idx) => (
                <div
                  key={_idx}
                  className="border flex flex-col justify-between w-[50%] h-[125px] border-[#F9FAFB] bg-[#F9FAFB] p-[16px] rounded-[20px]"
                >
                  <h3>{item?.title}</h3>
                  <p>{item?.data}</p>
                </div>
              ))}
            </div>
            <div className="border flex flex-col justify-between w-full h-[125px] border-[#F9FAFB] bg-[#F9FAFB] p-[16px] rounded-[20px]">
              <h3 className="font-normal text-sm text-grayInactive">
                Total Revenue
              </h3>
              <h3 className="font-bold text-[22px]  text-grayBlack2">
                ₦1,000,000,000.00
              </h3>
            </div>
          </section>
        </div>
      </section>

      <section className="flex items-start gap-4">
        <DashboardReservation />
        <Guest />
        <StatTransactionTable />
        {/* <MantineTableee /> */}
      </section>
    </div>
  );
};

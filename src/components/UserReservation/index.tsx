import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDrawer from "../Drawer";
import Image from "next/image";
import { PendingReservation } from "./pending-reservation";
import { UpcomingReservation } from "./upcoming-reservation";
import { PastReservation } from "./past-reservation";

export const UserReservations = () => {
  const completed = true;
  return (
    <div>
      {/* mobile navbar */}
      <div className="lg:hidden block">
        {/* <div className="border-b-[1px] flex items-center px-6 justify-between max-h-[70px] border-[#E9E9E9] fixed inset-0 z-[9999] backdrop-blur-md bg-grayblack">
          <Image src="/dashboard/logo.svg" alt="img" width="120" height="120" />
          <UserDrawer />
        </div> */}
      </div>
      <div className="bg-[#F7F7F7] lg:pt-32 pt-20">
        <div className="flex flex-col items-center lg:pt-20 pt-0">
          <h3 className=" text-[56px] font-medium text-grayBlack">
            My Reservation
          </h3>

          {/* Tab */}
          <Tabs
            defaultValue="pending-reservation"
            className="w-full h-full pt-6"
          >
            <div className="w-fit flex mx-auto">
              <TabsList className="w-full py-3 flex rounded-[56px] border border-grayoutline bg-card items-center justify-between">
                <div className="flex w-full justify-between items-center transition ease-in ">
                  <TabsTrigger
                    value="pending-reservation"
                    className=" w-1/2 rounded-[56px] data-[state=active]:bg-grayBlack2 data-[state=active]:text-input text-grayInactive"
                  >
                    Pending Reservation
                  </TabsTrigger>
                  <TabsTrigger
                    value="upcoming-reservation"
                    className="w-1/2 rounded-[56px] data-[state=active]:bg-grayBlack2 data-[state=active]:text-input text-grayInactive"
                  >
                    Upcoming reservation
                  </TabsTrigger>
                  <TabsTrigger
                    value="past-reservation"
                    className="w-1/2 rounded-[56px] data-[state=active]:bg-grayBlack2 data-[state=active]:text-input text-grayInactive"
                  >
                    Past reservation
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            <div className="">
              <TabsContent value="pending-reservation" className="w-full">
                <PendingReservation />
              </TabsContent>
              <TabsContent value="upcoming-reservation">
                <UpcomingReservation />
              </TabsContent>
              <TabsContent value="past-reservation">
                <PastReservation />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

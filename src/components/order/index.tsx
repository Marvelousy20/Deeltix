import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OngoingDelivery } from "./OngoingDelivery";
import { Completed } from "./CompletedDelivery";

export const MyOrder = () => {
  const completed = true;
  return (
    <div>
      <div className="bg-[#F7F7F7] pt-32">
        <div className="flex flex-col items-center pt-20">
          <h3 className=" text-[56px] font-medium text-grayBlack">My Order</h3>

          {/* Tab */}
          <Tabs defaultValue="ongoing" className="w-full h-full pt-6 pb-20">
            <div className="w-[300px] flex mx-auto">
              <TabsList className="w-full flex rounded-[56px] border border-grayoutline bg-card items-center justify-between">
                <div className="w-full flex justify-between items-center transition ease-in ">
                  <TabsTrigger
                    value="ongoing"
                    className=" w-1/2 rounded-[56px] data-[state=active]:bg-grayBlack2 data-[state=active]:text-input py-3 text-grayInactive"
                  >
                    Ongoing
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="w-1/2 rounded-[56px] data-[state=active]:bg-grayBlack2 data-[state=active]:text-input py-3 text-grayInactive"
                  >
                    Completed
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            <div className="bg-red-500">
              <TabsContent value="ongoing" className="w-full">
                <OngoingDelivery />
              </TabsContent>
              <TabsContent value="completed">
                <Completed />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

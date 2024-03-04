"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantProfile } from "./restaurant";
import { RestaurantAccount } from "./account";
import { RestaurantPassword } from "./password";
import { ProfileUpload } from "./picture-upload";

export const ProfileTab = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className=" font-bold text-2xl text-[#000000]">Profile</h3>
        <p className="font-normal text-base text-grayInactive">
          Manage and update your account info{" "}
        </p>
      </div>
      <Tabs defaultValue="account" className="w-full flex flex-col gap-10">
        <div className="w-fit flex items-center">
          <TabsList className="w-full py-3">
            <div className="flex w-full justify-between items-center transition ease-in ">
              <TabsTrigger
                value="account"
                className=" data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="restaurant"
                className=" data-[state=active]:bg-[#F7F7F7] py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
              >
                Restaurant
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className=" data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
              >
                Password
              </TabsTrigger>
            </div>
          </TabsList>
        </div>
        <div>
          <TabsContent value="account">
            <RestaurantAccount />
          </TabsContent>
          <TabsContent value="restaurant">
            {/* <RestaurantProfile /> */}
            <ProfileUpload />
          </TabsContent>

          <TabsContent value="password">
            <RestaurantPassword />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

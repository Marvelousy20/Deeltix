import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignUpForm } from "./personal-sign-up-form";
import { BusinessSignUp } from "./business-sign-up-form";

export const SignUpTabs = ({
  personalClose,
  businessClose,
}: {
  personalClose: () => void;
  businessClose: () => void;
}) => {
  return (
    <div className="flex items-center justify-center py-[20px]">
      <Tabs
        defaultValue="personal"
        className="w-full flex flex-col items-center justify-center"
      >
        <TabsList className="bg-[#F0F3F8] !px-1">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-white border-transparent data-[state=active]:border-b-0 data-[state=active]:rounded-[8px] data-[state=active]:text-[#574DFF] data-[state=active]:py-2 data-[state=active]:px-5"
          >
            Personal account
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="data-[state=active]:bg-white border-transparent data-[state=active]:border-b-0 data-[state=active]:rounded-[8px] data-[state=active]:text-[#574DFF] data-[state=active]:py-2 data-[state=active]:px-5"
          >
            Business account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <SignUpForm close={personalClose} />
        </TabsContent>
        <TabsContent value="business">
          <BusinessSignUp close={businessClose} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

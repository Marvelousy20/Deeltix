import { NotificationStatus } from "iconsax-react";
import React from "react";

export const NotificationEmptyState = () => {
  return (
    <div className="flex flex-col gap-5  items-center justify-center">
      <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-[#F7F7F7] border border-[#E7EAF1]">
        <NotificationStatus />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[#2C2929] font-medium text-lg">
          It&apos;s empty here
        </p>
        <p className="font-normal text-sm text-[#636C71]">
          {" "}
          Check back in some other time
        </p>
      </div>
    </div>
  );
};

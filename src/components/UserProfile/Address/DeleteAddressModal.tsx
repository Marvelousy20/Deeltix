import { Button } from "@/components/ui/button";
import React from "react";

export const DeleteAddress = () => {
  return (
    <div className="w-fit p-8 flex items-center justify-center rounded-2xl border border-white bg-white">
      <div className="flex flex-col gap-3 items-center justify-center">
        <p className="max-w-[300px] text-center text-base text-normal text-comment ">
          Are you sure you want to proceed to delete this address?
        </p>
        <div>
          <Button className="text-white text-base font-bold bg-grayBlack2 rounded-[40px]">
            Yes, proceed
          </Button>
        </div>
        <p className="text-xl font-bold text-grayBlack2 cursor-pointer">
          Cancel
        </p>
      </div>
    </div>
  );
};

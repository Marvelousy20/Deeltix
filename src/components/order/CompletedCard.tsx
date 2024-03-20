import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

export const CompletedCard = () => {
  return (
    <div className="p-1">
      <Card className="w-[300px]">
        <CardContent className="">
          <div className="relative">
            <Image
              src="/restaurants/elysium.png"
              alt="menu"
              width={180}
              height={180}
              className="w-full"
            />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex justify-between items-center w-full">
              <h3 className="font-medium text-lg text-grayBlack">
                Elysium Resta...
              </h3>

              <p className="font-normal text-base text-grayHelp">
                Order 1236779
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-grayHelp text-base font-normal">
                30 Dec, 2023
              </p>
              <span className="h-3 w-[1px] bg-grayHelp"></span>
              <p className="text-grayHelp text-base font-normal">02:40</p>
            </div>
          </div>
          <Button
            variant="card"
            className="mt-5 text-base font-medium text-grayBlack"
          >
            View order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

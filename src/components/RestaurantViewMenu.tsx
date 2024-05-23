"use client";
import React, { useState } from "react";
import { Loader, Modal } from "@mantine/core";
import { UserRound, Wine } from "lucide-react";
import Image from "next/image";

// dialog
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const RestaurantViewMenu = ({
  menuname,
  description,
  price,
  image,
  view,
  setView,
}: {
  menuname: string;
  description: string;
  price: number;
  image: string;
  view: any;
  setView: any;
}) => {
  //   const [view, setView] = useState<boolean>(false);

  return (
    <div>
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="w-full">
          <section className="flex flex-col overflow-y-scroll h-[400px]">
            <div className="pb-5">
              <h1 className=" font-medium text-[#636C71] text-xl">
                Menu details
              </h1>
            </div>

            <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
              <article className="flex flex-col gap-3">
                <section className="flex items-start space-x-28">
                  <div className="flex flex-col gap-2">
                    <h4 className="flex gap-4 font-medium text-base text-[#636C71] text-nowrap">
                      Menu name
                    </h4>
                    <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                      {menuname}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                      Menu description
                    </h4>
                    <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929] max-w-[200px]">
                      {description}
                    </h4>
                  </div>
                </section>

                <section className="flex items-start space-x-28">
                  <div className="flex flex-col gap-3">
                    <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                      Menu price
                    </h4>
                    <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                      {`#${price}`}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                      Menu Image
                    </h4>
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="Menu inage"
                      className="w-[150px] h-[150px]"
                    />
                  </div>
                </section>
              </article>
            </div>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

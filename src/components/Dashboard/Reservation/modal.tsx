"use client";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserRound } from "lucide-react";

export const ViewReservationModal = ({
  user,
  email,
  date,
  status,
}: {
  user: string;
  email: string;
  date: string;
  status: string;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>View</DialogTrigger>
        <DialogContent className=" overflow-y-scroll h-fit">
          <div className=" flex items-center justify-center py-4">
            <div className="flex flex-col gap-4 w-full z-[999]">
              <section>
                <div className="flex items-center gap-2 pb-5">
                  <UserRound color="#565D62" size={24} />
                  <h1 className=" font-medium text-[#636C71] text-xl">
                    Customer details
                  </h1>
                </div>

                <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
                  <article className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Full name
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {user}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Email address
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {email}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Date
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {date}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Confirmation status
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {status}
                      </h4>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

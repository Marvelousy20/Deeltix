import Image from "next/image";
import React from "react";
import { CompletedCard } from "./CompletedCard";

export const Completed = () => {
  return (
    <div className="bg-white pt-20 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <h3 className=" text-2xl font-normal text-dark2">Completed deliveries</h3>
        <section className="w-full flex items-start p-6 border border-grayoutline rounded-[32px]">
          <div className="">
            <CompletedCard/>
          </div>
        </section>
      </div>
    </div>
    
  );
};

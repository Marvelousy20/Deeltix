import Image from "next/image";
import React from "react";

export const OngoingDelivery = () => {
  return (
    <div className="bg-white pt-20 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <h3 className=" text-2xl font-normal text-dark2">Ongoing deliveries</h3>
        <section className="w-full py-[56px] flex items-center justify-center border border-grayoutline rounded-[32px]">
          <div className="flex flex-col items-center justify-center space-y-8">
            <figure className="rounded-full flex items-center justify-center h-[80px] w-[80px] border bg-milky border-grayoutline">
              <Image src="/order.png" width={50} height={50} alt="Order" />
            </figure>
            <p className=" text-2xl font-normal text-grayBlack2">
              We are waiting for your next order
            </p>
          </div>
        </section>
      </div>
    </div>
    
  );
};

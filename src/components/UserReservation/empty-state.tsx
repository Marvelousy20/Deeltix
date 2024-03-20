import Image from "next/image";
import React from "react";

export const EmptyState = () => {
  return (
    <div className="bg-white w-full">
      <div className="flex flex-col space-y-6 w-full">
        {/* <h3 className=" text-2xl font-normal text-dark2">Ongoing deliveries</h3> */}
        <section className="w-full p-10 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            <figure className="rounded-full flex items-center justify-center h-[80px] w-[80px] border bg-milky border-grayoutline">
              <Image src="/order.png" width={50} height={50} alt="Order" />
            </figure>
            <p className=" text-2xl font-normal text-grayBlack2">
              No reservation yet.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

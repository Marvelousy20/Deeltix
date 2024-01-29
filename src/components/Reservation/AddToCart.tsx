import Image from "next/image";
import React from "react";

export const Cart = () => {
  return (
    <section className="w-full">
      <div className=" flex flex-col gap-4 w-[85%] mx-auto">
        <h3 className=" text-3xl text-start font-bold border-b border-dividerColor pb-[15px] text-dark2">
          Your cart
        </h3>
        <div className="flex flex-col items-center justify-center space-y-3">
          <figure className="rounded-full flex items-center justify-center h-[80px] w-[80px] border bg-milky border-grayoutline">
            <Image src="/cart.png" width={50} height={50} alt="Order" />
          </figure>
          <div className="flex flex-col gap-1 items-center justify-center">
            <p className=" text-xl font-medium text-grayBlack2">
              Nothing here yet
            </p>
            <p className="text-grayHelp text-base font-normal">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

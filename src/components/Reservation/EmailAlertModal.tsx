import React from "react";
import { Button } from "../ui/button";
import InputField from "../ui/InputField";
import Image from "next/image";

export default function EmailModal() {
  return (
    <div className="flex flex-col w-[500px] bg-white rounded-lg">
      <div className="w-[500px]">
        <div className=" flex gap-1 text-lg text-[#565D62] items-center justify-center w-full h-8 bg-background mt-14">
          <Image src="/voltage.png" width={30} height={30} alt="Voltage" />
          <p className="font-normal text-sm text-grayBlack2">
            Please provide your email to complete your reservation
          </p>
        </div>
        <form className="flex flex-col pb-8 items-center justify-center">
          <div className="w-[300px]">
            <InputField
              title="Email address"
              placeholder="johndoe@gmail.com"
              id="email"
              type="string"
            />
          </div>

          <Button
            type="submit"
            className="bg-[#F0F3F8] py-2 rounded-[40px] text-xl font-bold text-[#D8D8D8] w-[300px]"
          >
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
}

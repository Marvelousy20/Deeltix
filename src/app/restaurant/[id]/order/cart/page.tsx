import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

function cart() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-10 max-w-[719px] mt-10">
        <p className="font-bold text-2xl">Order Summary</p>
        <div className="flex gap-5 justify-between">
          <div>
            <p className="text-xl font-semibold">Rice and Beans</p>
            <p className="font-medium text-base text-[#42474B]">#3,500.00</p>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Input
              // customMaxWidth={'719px'}
              type="number"
              min={1}
              placeholder="1"
              className="text-grayInactive text-lg font-normal mt-2 border border-[#DCDCDC] h-[36px] max-w-[251px]"
            />
            <p className="text-[#574DFF] underline">Remove</p>
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <div>
            <p className="text-xl font-semibold">Fried Rice</p>
            <p className="font-medium text-base text-[#42474B]">#3,500.00</p>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Input
              // customMaxWidth={'719px'}
              type="number"
              min={1}
              placeholder="1"
              className="text-grayInactive text-lg font-normal mt-2 border border-[#DCDCDC] h-[36px] max-w-[251px]"
            />
            <p className="text-[#574DFF] underline">Remove</p>
          </div>
        </div>
        <hr className="h-[1px]" />
        <div className="lg:w-[45rem]">
          <label className="text-grayHelp text-base font-medium">
            Any special requests/things we need to know? Indicate your Spice
            Level
          </label>
          <Input
            customMaxWidth={'719px'}
            type="number"
            min={1}
            placeholder=""
            className="text-grayInactive text-lg font-normal mt-2"
          />
          {/* {errors.restaurantName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.restaurantName?.message}
                </div>
              )} */}
        </div>
        <div className="lg:w-[45rem]">
          <label className="text-grayHelp text-base font-medium">
            Enter Discount Code or Voucher Code
          </label>
          <Input
            customMaxWidth={'719px'}
            type="number"
            min={1}
            placeholder=""
            className="text-grayInactive text-lg font-normal mt-2"
          />
          {/* {errors.restaurantName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.restaurantName?.message}
                </div>
              )} */}
        </div>

        <div className="flex flex-col gap-4 rounded-lg text-white bg-[#1D1D1D] px-5 py-10">
          <div className="flex justify-between">
            <p>Item Total</p>
            <p>72,000.00</p>
          </div>
          <div className="flex justify-between">
            <p>Service Charge (2.50%)</p>
            <p>72,000.00</p>
          </div>
          <div className="flex justify-between">
            <p>VAT (2.50% FIRS)</p>
            <p>3,200.00</p>
          </div>
          <hr className="h-[1px] text-[#FEFEFE]" />
          <div className="flex justify-between">
            <p>Grand Total</p>
            <p>82,000.00</p>
          </div>

          <Button
            className="w-[200px] md:w-[300px] text-white font-normal mx-auto"
            variant="primary"
            type="submit"
          >
            Confirm Order + Pay Bill
          </Button>
        </div>
      </div>
    </div>
  );
}

export default cart;

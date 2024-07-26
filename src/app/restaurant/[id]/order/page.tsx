'use client';
import { auth } from '@/axios-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserSingleRestaurant } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Clock9, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

function WhoIsOrdering() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<UserSingleRestaurant>(`/api/restaurants/${id}`),
    queryKey: ['sigle-restaurat'],
    enabled: !!id,
    select: ({ data }) => data?.data?.data?.restaurant,
  });
  const style = {
    backgroundImage: `url(${data?.displayPicture})`,
  };
  return (
    <div className="flex flex-col gap-4">
      <div
        style={style}
        className={`text-white relative flex flex-col gap-4 bg-no-repeat bg-center opacity-90 py-[6rem] items-center justify-center`}
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="flex flex-col gap-3 z-10">
          <p className="font-bold text-4xl text-center">{data?.name}</p>
          <p className="font-base font-medium text-center">
            {data?.description}
          </p>
          <div className="flex gap-6 bg-[#574DFF33] bg-opacity-20 rounded-full py-4 px-6">
            <div className="flex items-center gap-1">
              <span>
                <Clock9 size={15} />
              </span>
              {data?.openingHour}-{data?.closingHour}
            </div>
            <div className="flex items-center gap-1">
              <span>
                <MapPin size={15} />
              </span>
              {data?.address}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="py-5">
          <h4 className="text-center font-bold text-2xl">
            Who is making this order?
          </h4>
        </div>
        <form className="flex flex-col gap-6">
          <div className="lg:w-[45rem]">
            <label className="text-grayHelp text-lg font-medium">
              Preferred Name*
            </label>
            <Input
              customMaxWidth={'719px'}
              placeholder="e.g John Doe"
              className="text-grayInactive text-lg font-normal mt-2"
            />
            {/* {errors.restaurantName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.restaurantName?.message}
                </div>
              )} */}
          </div>
          <div className="lg:w-[45rem]">
            <label className="text-grayHelp text-lg font-medium">
              Table no*
            </label>
            <Input
              customMaxWidth={'719px'}
              type="number"
              min={1}
              placeholder="Table 1"
              className="text-grayInactive text-lg font-normal mt-2"
            />
            {/* {errors.restaurantName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.restaurantName?.message}
                </div>
              )} */}
          </div>
          <div>
            <fieldset className="text-[#2C2929] font-base">
              <legend className="">Would you like an email receipt?</legend>
              <div className="flex gap-2">
                <input
                  type="radio"
                  id="emailRecipt"
                  name="contact"
                  value="yes"
                />
                <label htmlFor="emailRecipt">Yes</label>

                <input
                  type="radio"
                  id="emailRecipt"
                  name="contact"
                  value="no"
                />
                <label htmlFor="emailRecipt">No</label>
              </div>
            </fieldset>
          </div>
          <Button
            className="w-[200px] md:w-[300px] text-white font-normal mx-auto"
            variant="primary"
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WhoIsOrdering;

'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RestaurantDetails } from '@/types';
import { auth } from '@/axios-config';
import CarouselSlider from '@/components/carousel';
import Image from 'next/image';

export default function Restaurants() {
  const { data, isLoading } = useQuery({
    queryFn: async () => await auth.get<RestaurantDetails>(`/api/restaurants`),
    queryKey: ['restaurant-details'],
    select: ({ data }) => data?.data,
  });
  return (
    <div className="flex flex-col gap-5 lg:mt-20 mt-0 lg:px-20 px-8">
      <div className="flex gap-x-2 lg:mt-20 items-center">
        <h3 className="lg:text-4xl text-2xl lg:font-medium font-bold pb-5">
          Handpicked restaurats for you
        </h3>
        <Image
          src="/fingers.svg"
          alt="glowing_stars"
          width={28}
          height={28}
          className="hidden lg:block"
        />
      </div>
      <div className="mt-0 flex items-center gap-3">
        {isLoading ? <p>Loading...</p> : <CarouselSlider data={data} />}
      </div>
    </div>
  );
}

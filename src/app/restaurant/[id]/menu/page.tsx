'use client';
import React, { useEffect, useState } from 'react';
import { Receipt } from 'iconsax-react';
import Image from 'next/image';
import Accordion from './Accordion';
import {
  MenuCategoryDetails,
  MenuDetails,
  MenuType,
  UserSingleRestaurant,
} from '@/types';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { api, auth } from '@/axios-config';
import { useQueries, useQuery } from '@tanstack/react-query';
import Categories from './Categories';

export interface IMenu {
  headings: string;
  number: string;
  icon: React.ReactNode;
}

type categoryType = {
  id: string;
  name: string;
};

export default function Menu() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<UserSingleRestaurant>(`/api/restaurants/${id}`),
    queryKey: ['sigle-restaurat'],
    enabled: !!id,
    select: ({ data }) => data?.data?.data?.restaurant,
  });

  //Requuest to get restaurat category list

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryFn: async () =>
      await auth.get<MenuCategoryDetails>(
        `/api/restaurants/${id}/menu/categories`
      ),
    queryKey: ['menu-category'],
  });

  // Request to get each category menu
  const categoryIds = category?.data?.data?.data?.menuCategories?.map((cat) => cat.id) || [];
  const categoryQueries = useQueries({
    queries: categoryIds.map((catId) => {
      return {
        queryKey: ['cat-menu', catId],
        queryFn: async () => await auth.get(`/api/restaurants/${id}/menu?category=${catId}`),
        // enabled: !!catId,
      };
    }),
  });

  console.log(categoryQueries)

  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-4 bg-[url('/bg.svg')] bg-no-repeat bg-cover opacity-90 h-[40vh] items-center justify-center">
        {/* <div>
            <Image src="" />
        </div> */}
        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl text-center">{data?.name}</p>
          <p className="font-base font-medium text-center">
            {data?.description}
          </p>
          <div
            className="flex px-[24px] py-[i6px] gap-6 bg-[#background: rgba(87, 77, 255, 0.2);
;
]"
          >
            <div className="">
              <span>i</span> {data?.openingHour}-{data?.closingHour}
            </div>
            <div>
              <span>i</span> {data?.address}
            </div>
          </div>
          <div className="mt-6 bg-[#574DFF] flex gap-2 rounded-3xl py-3 px-4">
            <Receipt size={18} />
            Make a reservation
          </div>
        </div>
      </div>
      <div className="container flex flex-col">
        <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
          {category?.data?.data?.data?.menuCategories.map((cat, idx) => (
            <div key={idx}>
              <Categories name={cat.name} />
              {/* <Categories name={cat.} /> */}
            </div>
          ))}
        </div>

        {/* <div className="w-[546px]">
          {categoryQueries.map((query, idx) => (
            query.isSuccess && query.data?.data?.data?.data.menu.map((menu) => (
              <Accordion key={menu.id} title={menu.name}>
                <div className="flex bg-background rounded-lg w-[546px] h-fit">
                  <div className="p-3">
                    <Image
                      src={menu.image}
                      alt="menu-image"
                      width={216}
                      height={126}
                    />
                  </div>
                  <div className="p-3 flex flex-col justify-between">
                    <div className="flex flex-col justify-between flex-wrap">
                      <p className="text-lg font-semibold">{menu.name}</p>
                      <p className="font-medium text-sm text-[#475467]">
                        {menu.description}
                      </p>
                    </div>
                    <p className="text-primary font-semibold text-base">
                      # {menu.price}
                    </p>
                  </div>
                </div>
              </Accordion>
            ))
          ))}
        </div> */}
        {/* <div className="w-[546px] ">
          {menu?.data.map((aMenu, idx) => (
            <Accordion key={idx} title={aMenu.name}>
              <div className="flex bg-background rounded-lg w-[546px] h-fit">
                <div className="p-3">
                  <Image
                    src={`${aMenu.image}`}
                    alt="menu-image"
                    width={216}
                    height={126}
                  />
                </div>
                <div className="p-3 flex flex-col justify-between">
                  <div className="flex flex-col justify-between flex-wrap">
                    <p className="text-lg font-semibold">{aMenu.name}</p>
                    <p className="font-medium text-sm text-[#475467]">
                      {aMenu.description}
                    </p>
                  </div>
                  <p className="text-primary font-semibold text-base">
                    # {aMenu.price}
                  </p>
                </div>
              </div>
            </Accordion>
          ))}
        </div> */}
      </div>
    </div>
  );
}

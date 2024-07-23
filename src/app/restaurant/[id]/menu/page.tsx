'use client';
import React, { useState } from 'react';
import { Receipt } from 'iconsax-react';
import Image from 'next/image';
// import Accordion from "./Accordion";
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
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { url } from 'inspector';
import { Clock9, MapPin } from 'lucide-react';

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
  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryFn: async () =>
      await auth.get<MenuCategoryDetails>(
        `/api/restaurants/${id}/menu/categories`
      ),
    queryKey: ['menu-category'],
  });

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  // Fetch menu items for the active category
  const { data: menuItems, isLoading: menuLoading } = useQuery(
    ['menu-items', activeCategoryId],
    () => auth.get(`/api/restaurants/${id}/menu?category=${activeCategoryId}`),
    {
      enabled: !!activeCategoryId, // Only run the query if activeCategoryId is not null
    }
  );

  const [activeCategoryName, setActiveCategoryName] = useState<
    string | undefined
  >('');

  if (categoryLoading) return <div>Loading categories...</div>;

  const categoriesIds = categories?.data?.data?.data?.menuCategories.map(
    (category) => category.id
  );

  const handleSetCategories = (id: string | null, name: string | undefined) => {
    setActiveCategoryId(id);
    setActiveCategoryName(name);
  };
  //bg-[url('/bg.svg')]

  const style = {
    backgroundImage: `url(${data?.displayPicture})`,
  };

  console.log(data);

  return (
    <div className="flex flex-col gap-4">
      <div
        style={style}
        className={`text-white relative flex flex-col gap-4 bg-no-repeat bg-cover opacity-90 py-[6rem] items-center justify-center`}
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
        <button className="mt-6 bg-[#574DFF] gap-2 rounded-3xl py-3 px-4 flex justify-center items-center z-10">
          <Receipt size={18} />
          Make a reservation
        </button>
      </div>
      <div className="container flex flex-col lg:px-[10rem]">
        <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
          {categories?.data?.data?.data?.menuCategories.map((cat, idx) => (
            <div key={idx}>
              <Categories
                name={cat.name}
                activeCategoryName={activeCategoryName}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-6">
          {categories?.data?.data?.data?.menuCategories.map((category) => (
            <Accordion
              key={category.name}
              type="single"
              collapsible
              className="w-full space-y-6"
            >
              <div className="w-full space-y-6">
                <AccordionItem value={category.id}>
                  <AccordionTrigger
                    onClick={() =>
                      handleSetCategories(category.id, category.name)
                    }
                    className="bg-[#293056] w-full text-white p-4 rounded-lg text-start"
                  >
                    {category.name}
                  </AccordionTrigger>

                  {activeCategoryId === category.id && (
                    <AccordionContent>
                      {menuLoading ? (
                        <div>Loading menu...</div>
                      ) : menuItems?.data?.data?.data?.menu?.length > 0 ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {menuItems?.data.data.data.menu.map((item: any) => (
                            <div
                              className="flex flex-col md:flex md:flex-row bg-background rounded-lg max-w-[34rem] h-full mt-6 p-3 gap-4 pt-4"
                              key={item.id}
                            >
                              <div className="relative min-w-[13rem] h-[9.5rem]">
                                <img
                                  src={item.image}
                                  alt="menu-image"
                                  // width={216}
                                  // height={126}
                                  className="w-full h-full md:w-[13rem] md:h-[9.5rem] object-cover"
                                />
                              </div>
                              <div className="flex flex-col justify-between pb-6">
                                <div className="flex flex-col justify-between flex-wrap">
                                  <p className="text-lg font-semibold">
                                    {item.name}
                                  </p>
                                  <p className="font-medium text-sm text-[#475467]">
                                    {item.description}
                                  </p>
                                </div>
                                <p className="text-primary font-semibold text-base">
                                  # {item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center flex flex-col items-center space-y-4 bg-[#F4F5FF] py-6 mt-6 rounded-lg">
                          <div className="bg-white p-3 rounded-full">
                            <Image
                              src="/restaurants/notification-status.svg"
                              alt="notification"
                              width={32}
                              height={32}
                              className=""
                            />
                          </div>

                          <h3 className="text-lg text-[#574DFF]">
                            Menu not available
                          </h3>
                          <p className="text-sm text-[#636C71]">
                            Check back some other time
                          </p>
                        </div>
                      )}
                    </AccordionContent>
                  )}
                </AccordionItem>
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

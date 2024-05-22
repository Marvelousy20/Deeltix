'use client';
import React, { useEffect, useState } from 'react';
import { Receipt } from 'iconsax-react';
import Image from 'next/image';
import Accordion from './Accordion';
import { MenuType } from '@/types';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/axios-config';
import { useQuery } from '@tanstack/react-query';
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
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [categories, setCategories] = useState<categoryType[] | null>(null);

  const fetchCategory = async () => {
    if (!id) {
      return;
    }
    try {
      const result = await api.get(
        `/api/restaurants/${id}/menu/categories`
        // /api/restaurants/65ba1e5797aa8ffdb9208993/menu/categories'
      );
      const allCategories = result.data.data.data;
      setCategories(allCategories.menuCategories);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: allCategories } = useQuery({
    queryFn: fetchCategory,
    queryKey: ['category restaurant'],
  });

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      if (!id) {
        return;
      }
      return api.get(`/api/restaurants/${id}/menu`);
    },
    enabled: !!id,
  });

  if (isError) {
    toast.error('Something happened getting menu');
  }

  useEffect(() => {
    fetchCategory();
    if (isSuccess) {
      setMenu(data?.data.data.data.menu);
      console.log(data?.data.data.data.menu);
    }
    console.log(categories);
  }, [id, data]);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-4 bg-[url('/bg.svg')] bg-no-repeat bg-cover opacity-90 h-[40vh] items-center justify-center">
        {/* <div>
            <Image src="" />
        </div> */}
        <div className="flex flex-col gap-3">
          <p className="font-bold text-4xl text-center">
            Cilantro Bar & Cusines
          </p>
          <p className="font-base font-medium text-center">
            Sea side , family, lovers best restaurant
          </p>
          <div
            className="flex px-[24px] py-[i6px] gap-6 bg-[#background: rgba(87, 77, 255, 0.2);
;
]"
          >
            <div className="">
              <span>i</span> 9am - 11am{' '}
            </div>
            <div>
              <span>i</span> 32 Lekki - Epe Expressway, Lekki peninsula 106104,
              Lekki
            </div>
          </div>
        </div>
        <div className="mt-6 bg-[#574DFF] flex gap-2 rounded-3xl py-3 px-4">
          <Receipt size={18} />
          Make a reservation
        </div>
      </div>

      <div className="container flex flex-col">
        <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
          {categories?.map((cat, idx) => (
            <div key={idx}>

                <Categories name={cat.name} />
            </div>
          ))}
        </div>

        <div className="w-[546px] ">
        {menu?.map((aMenu, idx) => (
          <Accordion key={idx} title={aMenu.name}>
            <div className="flex bg-background rounded-lg w-[546px] h-fit">
              <div className="p-3">
                <Image src={`${aMenu.image}`} alt="menu-image" width={216} height={126} />
              </div>
              <div className="p-3 flex flex-col justify-between">
                <div className="flex flex-col justify-between flex-wrap">
                  <p className="text-lg font-semibold">
                    {aMenu.name}
                  </p>
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
        </div>
      </div>
    </div>
  );
}

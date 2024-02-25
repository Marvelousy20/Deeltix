'use client';
import { DataTable } from '@/components/Table/DataTable';
import { People, Reserve } from 'iconsax-react';
import { FolderOpen, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { menuColumns, menuData } from './table-column';
import { useUser } from '@/context/user';
import { api } from '@/axios-config';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export interface IMenu {
  headings: string;
  number: string;
  icon: React.ReactNode;
}
export const CustomerMenu = () => {
  const { restaurantId } = useUser();
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    if (!restaurantId) {
      return;
    }
    try {
      const result = await api.get(
        `/api/restaurants/${restaurantId}/menu`
      );
      const allMenu = result.data.data.data.menu;
      setMenu(allMenu);
      return allMenu;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchMenu();
  });

  const list: IMenu[] = [
    {
      headings: 'Total Guest',
      number: '40',
      icon: <Reserve color="#574DFF" />,
    },
    {
      headings: 'Total Guest',
      number: '40',
      icon: <FolderOpen color="#574DFF" />,
    },
  ];
  return (
    <div className="p-[32px]">
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Menu</h3>
          <p className="font-normal text-base text-[#636C71]">
            Upload and edit new meals
          </p>
        </div>
        <div className="flex items-center gap-2 py-3 px-4 bg-[#574DFF] rounded-[40px]">
          <PlusCircle color="#F0F3F8" />
          <p className="text-[#F0F3F8] text-sm font-medium">new item</p>
        </div>
      </section>

      <section className="grid grid-cols-2 py-8">
        {list.map((item, _idx) => (
          <div key={_idx} className="border border-[#EAECF0]  p-[40px]">
            <section className="flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <p className="font-medium text-base text-[#636C71]">
                  {item.headings}
                </p>
                <h3 className="font-bold text-3xl text-[#2C2929]">
                  {item.number}
                </h3>
              </div>
              <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center bg-[#574DFF1A]">
                {item.icon}
              </div>
            </section>
          </div>
        ))}
      </section>

      {/* table */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between p-[15px] w-full bg-[#F2F4F7] rounded-[24px]">
          <h3 className="font-medium text-xl text-[#2C2929]">Menu</h3>
          <Input placeholder="Filter names..." className="max-w-sm" />
        </div>
        <div className="border-[2px] border-[#F7F7F7] rounded-[10px] w-full">
          <DataTable columns={menuColumns} data={menu} />
        </div>
      </section>
    </div>
  );
};

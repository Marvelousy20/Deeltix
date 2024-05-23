"use client";
import { Edit2, SearchStatus1, Trash } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";

export const MenuDropDown = ({
  onDelete,
  onView,
  id,
  menu,
}: {
  onDelete: any;
  onView: any;
  id: string;
  menu: string;
}) => {
  const { push } = useRouter();
  function handleEditMenu(menuId: string, restaurantId: string) {
    push(`/edit-menu?restaurantid=${restaurantId}&menuid=${menuId}`);
  }
  return (
    <section className=" p-[20px] flex flex-col">
      <div
        onClick={onView}
        className="flex cursor-pointer items-center gap-3 border-b border-[#E7EAF1] pb-[12px]"
      >
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <SearchStatus1 size={20} />
        </div>
        <p className="text-base font-medium text-[#2C2929]">View</p>
      </div>
      <div
        onClick={() => handleEditMenu(id, menu)}
        className="flex cursor-pointer items-center gap-3 border-b border-[#E7EAF1] py-[12px]"
      >
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <Edit2 size={20} />
        </div>
        <p className="text-base font-medium text-[#2C2929]">Edit</p>
      </div>
      <div
        className="flex cursor-pointer items-center gap-3 pt-[12px]"
        onClick={onDelete}
      >
        <div className="h-[30px] w-[30px] flex items-center justify-center rounded-full border border-[#E7EAF1]">
          <Trash size="20" />
        </div>
        <p className="text-base font-medium text-[#2C2929]">Delete</p>
      </div>
    </section>
  );
};

"use client";
import { Edit2, SearchStatus1, Trash } from "iconsax-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { RestaurantViewMenu } from "@/components/RestaurantViewMenu";

export const MenuDropDown = ({
  onDelete,
  id,
  menu,
  menuname,
  description,
  price,
  image,
}: {
  onDelete: any;
  id: string;
  menu: string;
  menuname: string;
  description: string;
  price: number;
  image: string;
}) => {
  const [view, setView] = useState<boolean>(false);

  const { push } = useRouter();
  function handleEditMenu(menuId: string, restaurantId: string) {
    push(`/edit-menu?restaurantid=${restaurantId}&menuid=${menuId}`);
  }
  return (
    <div>
      <section className=" p-[20px] flex flex-col">
        <div
          onClick={() => setView(true)}
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

      <RestaurantViewMenu
        menuname={menuname}
        description={description}
        price={price}
        image={image}
        view={view}
        setView={setView}
      />
      {/* <Dialog open={view} onOpenChange={setView}>
        <DialogContent className="w-full">
          <section className="flex flex-col overflow-y-scroll h-[400px]">
            <div className="flex items-center gap-2 pb-5">
              <UserRound color="#565D62" size={24} />
              <h1 className=" font-medium text-[#636C71] text-xl">
                Customer details
              </h1>
            </div>

            <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
              <article className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Menu name
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                    {menuname}
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Menu description
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929] max-w-[200px]">
                    {description}
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                    Menu price
                  </h4>
                  <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                    {price}
                  </h4>
                </div>

                <Image src={image} width={200} height={200} alt="Menu inage" />
              </article>
            </div>
          </section>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};

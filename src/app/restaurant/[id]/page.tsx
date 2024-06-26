"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Overview from "@/components/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reservation from "@/components/Reservation";
import Rating from "@/components/Rating";
import AllRestaurants from "@/components/Reservation/AllRestuarant";
import { Input } from "@/components/ui/input";
import UserDrawer from "@/components/Drawer";
import { Bookmark } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { useSearchParams } from "next/navigation";
import {
  MenuCategoryDetails,
  MenuDetails,
  UserSingleRestaurant,
} from "@/types";
import UserRating from "@/components/Rating/User-Rating";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import MenuCard from "@/components/Menu/MenuCard";
import { Skeleton } from "@/components/ui/skeleton";
import { clsx } from "@mantine/core";
import Link from "next/link";
import Map from "@/components/Map";

export default function DetailPage() {
  const { id } = useParams();
  const searchParam = useSearchParams();
  const [bookmark, setBookmark] = useState(false);
  const restaurantid = searchParam.get("restaurant");
  const query = useQueryClient();
  const [scroll, setScroll] = useState<number | null>(null);

  const handleScroll = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const menu = document.getElementById("menuList") as HTMLElement;
    menu.scrollIntoView({ behavior: "smooth" });
  };

  const [categorymenu, setCategoryMenu] = useState<MenuDetails | null>(null);
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<UserSingleRestaurant>(`/api/restaurants/${id}`),
    queryKey: ["single-restaurant"],
    select: ({ data }) => data?.data?.data?.restaurant,
  });

  // request to get restaurant menu
  const { data: menu, isLoading: menuLoading } = useQuery({
    queryFn: async () =>
      await auth.get<MenuDetails>(`/api/restaurants/${id}/menu`),
    queryKey: ["all-menu"],
  });

  // request to get restaurant category menu
  const fetchData = async (categoryid: string) => {
    try {
      const categoryMenu = await auth.get<MenuDetails>(
        `/api/restaurants/${id}/menu?category=${categoryid}`
      );
      setCategoryMenu(categoryMenu.data);
    } catch (error: any) {
      throw new Error(error.response.data.message || error.message);
    }
  };

  // request to get restaurant categories list

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryFn: async () =>
      await auth.get<MenuCategoryDetails>(
        `/api/restaurants/${id}/menu/categories`
      ),
    queryKey: ["menu-category"],
  });

  // request for bookmark
  const { mutate, isLoading: bookmarkLoading } = useMutation({
    mutationFn: async () => await auth.patch(`/api/restaurants/${id}/bookmark`),
    mutationKey: ["bookmark"],
    onSuccess() {
      toast.success("Restaurant has been bookmarked");
      setBookmark(true);
      query.invalidateQueries(["all-bookmark"]);
    },
    onError(error) {
      toast.error("Bookmark this restaurant? Sign in first.");
      // handleError(error as ErrorType);
    },
  });

  return (
    <div className="w-full">
      <div>
        <div className="w-full lg:h-[500px]">
          <Image
            src={data?.banner as string}
            alt="restaurant-banner"
            width={1800}
            height={1400}
            objectFit="cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:px-20 px-8 lg:mt-10 mt-0 py-5 lg:py-0 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-grayBlack font-bold">{data?.name}</h2>

            <div className="h-[40px] w-[40px] rounded-full border-[2px] border-grayoutline flex items-center justify-center">
              <Bookmark
                onClick={() => mutate()}
                size={25}
                color={bookmark ? "#FF0000" : "#2C2929"}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className=" mt-0 lg:justify-between lg:flex justify-center space-y-6">
            <div className="flex items-center gap-2">
              <Image src="/money.svg" alt="money" width={48} height={48} />
              <p>&#8358;{formatPrice(data?.averagePrice)} average price</p>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/rating.svg" alt="rating" width={48} height={48} />
              <p>{data?.averageRating} reviews</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/location.svg"
                alt="location"
                width={48}
                height={48}
              />
              <p>{data?.address}</p>
            </div>

            {/* <div className="flex items-center gap-2">
              <Image
                src="/delivery.svg"
                alt="delivery"
                width={48}
                height={48}
              />
              <p>{data} delivery time</p>
            </div> */}
          </div>

          <div className="lg:flex lg:gap-10 gap-0 space-y-5 lg:mt-16 mt-0">
            {/* Tabs component */}
            <div className="col-span-4 lg:w-[60%] w-full">
              <section className="grid grid-cols-4 mb-8">
                {["Overview", "Menu", "Photos", "Review"].map((items, idx) => (
                  <Link
                    href={
                      idx === 0
                        ? "#overview"
                        : idx === 1
                        ? "#menuList"
                        : idx === 2
                        ? "#photos"
                        : "#review"
                    }
                    key={idx}
                    onClick={() => {
                      setScroll(idx);
                      handleScroll;
                    }}
                  >
                    <p
                      className={clsx(
                        scroll === idx
                          ? "border-b-[2px] border-b-black pb-2 px-4 cursor-pointer w-fit"
                          : " cursor-pointer px-4"
                      )}
                    >
                      {items}
                    </p>
                  </Link>
                ))}
              </section>

              <section id="overview">
                <Overview
                  description={data?.description as string}
                  days={data?.openingDays as string}
                  time={data?.openingHours as string}
                />
              </section>
              <div className="lg:grid grid-cols-6 hidden">
                <h1 className="text-3xl font-bold col-span-2">Menu</h1>
                <div className="col-span-4 w-full">
                  <Input placeholder="Search store menu" className="w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-5 items-center justify-center lg:hidden">
                <h1 className="text-3xl font-bold text-s">Menu</h1>
                <div className="w-full">
                  <Input placeholder="Search store menu" className="w-full" />
                </div>
              </div>

              <div id="menuList" className="mt-6 w-full">
                <Tabs defaultValue="all" className="lg:max-w-4xl w-full">
                  <TabsList className="grid lg:grid-cols-7 grid-cols-3 justify-items-start data-[state=active]:!text-blue-500 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>

                    {category?.data?.data?.data?.menuCategories?.map((item) => (
                      <div key={item?.id}>
                        <TabsTrigger
                          value={item?.name}
                          onClick={() => fetchData(item?.id)}
                        >
                          {item?.name}
                        </TabsTrigger>
                      </div>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="w-full">
                    {menuLoading ? (
                      <div className="flex flex-col space-y-3 max-w-[200px]">
                        <Skeleton className="h-[200px] w-[200px] rounded-xl" />
                      </div>
                    ) : (
                      <MenuCard data={menu?.data?.data?.data.menu} />
                    )}
                  </TabsContent>
                  {category?.data?.data?.data?.menuCategories.map(
                    (item, index) => {
                      return (
                        <TabsContent
                          value={item?.name}
                          className="w-full"
                          key={index}
                        >
                          <MenuCard data={categorymenu?.data?.data?.menu} />
                        </TabsContent>
                      );
                    }
                  )}
                </Tabs>
              </div>

              <div id="review" className="lg:mt-20 mt-10">
                <div className="flex flex-col gap-2 items-center lg:items-start justify-center lg:justify-normal">
                  <h1 className="lg:text-[2rem] text-xl font-bold">
                    Ratings & Reviews
                  </h1>
                  <p className="font-normal text-base  ">
                    The most commonly ordered items and dishes from this store
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <UserRating restaurantId={id} />
                  <Rating restaurantId={id} />
                </div>
              </div>
            </div>

            {/* Reservation on desktop */}
            <div className="lg:flex flex-col gap-20 border-l border-[#EDEDED] w-[40%] mx-auto hidden">
              <Reservation restaurantId={data?.id} />
              {/* <Cart /> */}
            </div>
          </div>

          <div id="photos" className=" flex flex-col gap-6">
            <div className="flex flex-col gap-8 lg:gap-0">
              <p className=" text-2xl font-bold text-grayBlack">Photos</p>
              <div className="lg:mt-9 mt-5">
                <AllRestaurants data={data} />
              </div>
            </div>

            {/* Restaurant around lekki */}
            {/* <div className="lg:mt-20 mt-0 flex flex-col gap-10 lg:gap-0">
              <div className="flex items-center gap-x-2">
                <h3 className="lg:text-4xl text-2xl font-bold lg:font-medium">
                  Restaurants around Lekki
                </h3>
                <Image
                  src="/greenheart.svg"
                  alt="glowing_stars"
                  width={28}
                  height={28}
                  className="hidden lg:block"
                />
              </div>

              <div className="lg:mt-9 mt-0">
                <CarouselSlider data={topRestaurentData} />
              </div>
            </div> */}
          </div>
          {/* Reservation on mobile */}
          <div className="lg:hidden flex flex-col gap-20">
            <Reservation restaurantId={data?.id} />
            {/* <Cart /> */}
          </div>
          {/* location google map */}
          {/* <Map /> */}
        </div>
      </div>
    </div>
  );
}

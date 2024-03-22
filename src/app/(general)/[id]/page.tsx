"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { topRestaurentData } from "@/components/data/TopRestaurant";
import { formatPrice } from "@/lib/utils";
import Overview from "@/components/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Menu from "@/components/Menu/All/Menu";
import { MenuData } from "@/components/Menu/All/data";
import Reservation from "@/components/Reservation";
import Rating from "@/components/Rating";
import { Cart } from "@/components/Reservation/AddToCart";
import AllRestaurants from "@/components/Reservation/AllRestuarant";
import CarouselSlider from "@/components/carousel";
import { Input } from "@/components/ui/input";
import UserDrawer from "@/components/Drawer";
import { Bookmark } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { useSearchParams } from "next/navigation";
import { UserSingleRestaurant } from "@/types";
import UserRating from "@/components/Rating/User-Rating";
import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";

export default function DetailPage() {
  const { id } = useParams();
  const searchParam = useSearchParams();
  const [bookmark, setBookmark] = useState(false);
  const restaurantid = searchParam.get("restaurant");
  const query = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<UserSingleRestaurant>(`/api/restaurants/${restaurantid}`),
    queryKey: ["single-restaurant"],
    select: ({ data }) => data?.data?.data?.restaurant,
  });

  // request for bookmark
  const { mutate, isLoading: bookmarkLoading } = useMutation({
    mutationFn: async () =>
      await auth.patch(`/api/restaurants/${restaurantid}/bookmark`),
    mutationKey: ["bookmark"],
    onSuccess() {
      toast.success("Restaurant has been bookmarked");
      setBookmark(true);
      query.invalidateQueries(["all-bookmark"]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const datas = topRestaurentData.find(
    (item) => item.name === decodeURIComponent(id as string)
  );
  const chickenMenu = MenuData.filter((menu) => menu.category === "chicken");
  const pastriesMenu = MenuData.filter((menu) => menu.category === "pastries");
  const burgerMenu = MenuData.filter((menu) => menu.category === "burger");

  return (
    <div className="w-full">
      <div>
        {/* mobile navbar */}
        <div className="lg:hidden block">
          <div className="border-b-[1px] flex items-center px-6 justify-between max-h-[70px] border-[#E9E9E9] fixed inset-0 z-[9999] backdrop-blur-md bg-grayblack">
            <Image
              src="/dashboard/logo.svg"
              alt="img"
              width="120"
              height="120"
            />
            <UserDrawer />
          </div>
        </div>
        <div className="mt-16 lg:mt-0">
          <Image
            src="/bg.svg"
            alt="img"
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
                // className={
                //   bookmark
                //     ? "text-[#FF0000] cursor-pointer "
                //     : "text-[#2C2929] cursor-pointer"
                // }
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
            <div className="col-span-4 lg:w-[70%] w-full">
              <Tabs defaultValue="overview" className="max-w-4xl">
                <TabsList className="lg:grid lg:grid-cols-4 w-full flex items-center justify-between">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="menu">Menu</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Overview />
                </TabsContent>
                <TabsContent value="menu">This is the menu page</TabsContent>
                <TabsContent value="photos">
                  This is the photos page
                </TabsContent>
                <TabsContent value="reviews">
                  This is the reviews page
                </TabsContent>
              </Tabs>

              <div className="lg:grid grid-cols-6 hidden">
                <h1 className="text-3xl font-bold col-span-2">Menu</h1>
                <div className="col-span-4 w-full">
                  <Input placeholder="Search store menu" className="w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-5 items-center justify-center lg:hidden">
                <h1 className="text-3xl font-bold">Menu</h1>
                <div className="w-full">
                  <Input placeholder="Search store menu" className="w-full" />
                </div>
              </div>

              <div className="mt-6 w-full">
                <Tabs defaultValue="all" className="lg:max-w-4xl w-full">
                  <TabsList className="grid lg:grid-cols-7 grid-cols-4 data-[state=active]:!text-blue-500 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="chicken">Chicken</TabsTrigger>
                    <TabsTrigger value="pastries">Pastries</TabsTrigger>
                    <TabsTrigger value="burger">Burger</TabsTrigger>
                    <TabsTrigger value="deserts">Deserts</TabsTrigger>
                    <TabsTrigger value="hotdog">Hotdog</TabsTrigger>
                    <TabsTrigger value="salads">Salads</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="w-full">
                    <Menu data={MenuData} />
                  </TabsContent>
                  <TabsContent value="chicken">
                    <Menu data={chickenMenu} />
                  </TabsContent>

                  <TabsContent value="pastries">
                    <Menu data={pastriesMenu} />
                  </TabsContent>
                  <TabsContent value="burger">
                    <Menu data={burgerMenu} />
                  </TabsContent>
                  <TabsContent value="deserts">
                    <Menu data={chickenMenu} />
                  </TabsContent>
                  <TabsContent value="hotdog">
                    <Menu data={chickenMenu} />
                  </TabsContent>
                  <TabsContent value="salads">
                    <Menu data={burgerMenu} />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="lg:mt-20 mt-10">
                <div className="flex flex-col gap-2 items-center lg:items-start justify-center lg:justify-normal">
                  <h1 className="lg:text-[2rem] text-xl font-bold">
                    Ratings & Reviews
                  </h1>
                  <p className="font-normal text-base  ">
                    The most commonly ordered items and dishes from this store
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <UserRating restaurantId={restaurantid} />
                  <Rating restaurantId={restaurantid} />
                </div>
              </div>
            </div>

            {/* Reservation on desktop */}
            <div className="lg:flex flex-col gap-20 border-l border-[#EDEDED] w-[30%] hidden">
              <Reservation restaurantId={data?.id} />
              <Cart />
            </div>
          </div>

          <div className=" flex flex-col gap-6">
            <div className="flex flex-col gap-8 lg:gap-0">
              <p className=" text-2xl font-bold text-grayBlack">Photos</p>
              <div className="lg:mt-9 mt-0">
                <AllRestaurants />
              </div>
            </div>

            {/* Restaurant around lekki */}
            <div className="lg:mt-20 mt-0 flex flex-col gap-10 lg:gap-0">
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

              {/* <div className="lg:mt-9 mt-0">
                <CarouselSlider data={topRestaurentData} />
              </div> */}
            </div>
          </div>
          {/* Reservation on mobile */}
          <div className="lg:hidden flex flex-col gap-20">
            <Reservation restaurantId={data?.id} />
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

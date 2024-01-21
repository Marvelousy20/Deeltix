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

export default function DetailPage() {
  const { id } = useParams();

  const data = topRestaurentData.find(
    (item) => item.name === decodeURIComponent(id as string)
  );

  const chickenMenu = MenuData.filter((menu) => menu.category === "chicken");
  const pastriesMenu = MenuData.filter((menu) => menu.category === "pastries");
  const burgerMenu = MenuData.filter((menu) => menu.category === "burger");

  return (
    <div>
      <div>
        <div>
          <Image
            src="/bg.svg"
            alt="img"
            width="1800"
            height={1400}
            objectFit="cover"
          />
        </div>

        <div className="px-20 mt-10">
          <div className="text-4xl font-bold">
            <h2>{data?.name}</h2>

            {/* bookmark icon here */}
          </div>

          <div className="mt-10 flex justify-between">
            <div className="flex items-center gap-2">
              <Image src="/money.svg" alt="money" width={48} height={48} />
              <p>&#8358;{formatPrice(data?.price)} average price</p>
            </div>

            <div className="flex items-center gap-2">
              <Image src="/rating.svg" alt="rating" width={48} height={48} />
              <p>{data?.rating} reviews</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/location.svg"
                alt="location"
                width={48}
                height={48}
              />
              <p>{data?.location}</p>
            </div>

            <div className="flex items-center gap-2">
              <Image
                src="/delivery.svg"
                alt="delivery"
                width={48}
                height={48}
              />
              <p>{data?.location} delivery time</p>
            </div>
          </div>

          <div className="grid gap-10 grid-cols-6 mt-16">
            {/* Tabs component */}
            <div className="col-span-4">
              <Tabs defaultValue="overview" className="max-w-4xl">
                <TabsList className="grid grid-cols-4 w-full">
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

              <div className="mt-6 w-full">
                <Tabs defaultValue="all" className="max-w-4xl w-full">
                  <TabsList className="grid grid-cols-7 w-full data-[state=active]:!text-blue-500 mb-8">
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

              <div className="mt-20">
                <h1 className="text-[2rem] font-bold">Ratings & Reviews</h1>
                <p>
                  The most commonly ordered items and dishes from this store
                </p>

                <div>
                  <Rating />
                  <Rating />
                  <Rating />
                </div>
              </div>
            </div>

            {/* Reservation */}
            <div className="col-span-2">
              <Reservation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

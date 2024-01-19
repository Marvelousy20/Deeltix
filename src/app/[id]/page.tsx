"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { topRestaurentData } from "@/components/data/TopRestaurant";
import { formatPrice } from "@/lib/utils";
import Overview from "@/components/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DetailPage() {
  const { id } = useParams();

  const data = topRestaurentData.find(
    (item) => item.name === decodeURIComponent(id)
  );

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
              <Tabs defaultValue="overview" className="max-w-2xl">
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
            </div>

            {/* Reservation */}
            <div className="col-span-2">Make a reservation</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { MapPin, Star, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { RestaurantDetails } from "@/types";

export default function CarouselSlider({ data }: RestaurantDetails) {
  const router = useRouter();

  function handleShowDetail(restaurantName: string, restaurantId: string) {
    router.push(`/${restaurantName}?restaurant=${restaurantId}`);
  }
  console.log("carousel", data);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto relative"
    >
      <CarouselContent className="h-full lg:h-fit w-full ">
        {data?.data?.restaurants?.map((d, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent>
                  <div className="relative">
                    <figure className="h-[250px] w-full">
                      <Image
                        src={d.displayPicture as string}
                        alt={d.name}
                        width={130}
                        height={130}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </figure>
                    {/* <h1 className="stroke absolute right-0 -bottom-8">
                      {index + 1}
                    </h1> */}
                    <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-grayoutline absolute top-3 right-3">
                      <Bookmark size={20} className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 w-full">
                    <div className="w-full flex flex-col gap-2">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="text-xl font-medium">{d.name}</h3>
                        <h6>Avg Price: &#8358;{formatPrice(d.averagePrice)}</h6>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <p className="text-sm whitespace-nowrap">
                            {d.address}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Star size={16} fill="#D4B200" stroke="#D4B200" />

                          <p>{d?.averageRating}.0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="card"
                    className="mt-5"
                    onClick={() => handleShowDetail(d.name, d.id)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

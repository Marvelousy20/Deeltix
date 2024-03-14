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

import { IRestaurent, RestaurantDetails } from "@/types";
import { stringify } from "querystring";

interface DataProps {
  data: IRestaurent[];
}

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
      <CarouselContent className="h-[340px] lg:h-fit w-full ">
        {data?.data?.restaurants?.map((d, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent>
                  <div className="relative">
                    <Image
                      src={d.displayPicture as string}
                      alt={d.name}
                      width={500}
                      height={300}
                    />
                    {/* <h1 className="stroke absolute right-0 -bottom-8">
                      {index + 1}
                    </h1> */}
                    <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-grayoutline absolute top-3 right-3">
                      <Bookmark size={20} className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div>
                      <h3 className="text-xl font-medium">{d.name}</h3>
                      <h6>Avg Price: &#8358;{formatPrice(d.averagePrice)}</h6>
                    </div>

                    <div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <p>{d.address}</p>
                      </div>

                      <div className="flex items-center justify-end">
                        <Star size={16} fill="#D4B200" stroke="#D4B200" />
                        <p>3</p>
                        {/* {d.rating} */}
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

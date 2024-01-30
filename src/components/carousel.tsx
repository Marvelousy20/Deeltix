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

import { IRestaurent } from "@/types";

interface DataProps {
  data: IRestaurent[];
}

export default function CarouselSlider({ data }: DataProps) {
  const router = useRouter();

  function handleShowDetail(restaurantName: string) {
    router.push(`/${restaurantName}`, {});
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto relative"
    >
      <CarouselContent className="h-[340px] lg:h-fit">
        {data.map((d, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent>
                  <div className="relative">
                    <Image src={d.img} alt={d.img} width={350} height={300} />
                    {/* <h1 className="stroke absolute right-0 -bottom-8">
                      {index + 1}
                    </h1> */}
                    <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-grayoutline absolute top-3 right-3">
                      <Bookmark size={20} className=" " />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div>
                      <h3 className="text-xl font-medium">{d.name}</h3>
                      <h6>Avg Price: &#8358;{formatPrice(d.price)}</h6>
                    </div>

                    <div>
                      <h6 className="flex items-center">
                        <MapPin size={16} /> {d.location}
                      </h6>

                      <h6 className="flex items-center justify-end">
                        <Star size={16} fill="#D4B200" stroke="#D4B200" />
                        {d.rating}
                      </h6>
                    </div>
                  </div>
                  <Button
                    variant="card"
                    className="mt-5"
                    onClick={() => handleShowDetail(d.name)}
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

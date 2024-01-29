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
} from "../ui/carousel";
import { MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

import { IRestaurent } from "@/types";

interface DataProps {
  data: IRestaurent[];
}

export default function AllRestaurants() {
  const allRestaurant = [
    {
      img: "/restaurants/elysium.png",
    },

    {
      img: "/restaurants/upscalequarters.png",
    },

    {
      img: "/restaurants/blackbell.png",
    },

    {
      img: "/restaurants/storylagos.png",
    },
    {
      img: "/restaurants/upscalequarters.png",
    },
    {
      img: "/restaurants/elysium.png",
    },
    {
      img: "/restaurants/upscalequarters.png",
    },
  ];

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mx-auto relative"
      >
        <CarouselContent className="flex gap-3">
          {allRestaurant.map((d, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 bg-transparent"
            >
              <div className="w-[300px] h-[200px]">
                <Image
                  src={d.img}
                  width={400}
                  height={400}
                  alt="All restaurant"
                  className="w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

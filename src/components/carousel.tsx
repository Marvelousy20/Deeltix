import { topRestaurentData } from "./data/TopRestaurant";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function CarouselSlider() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full mx-auto relative"
    >
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}

        {topRestaurentData.map((d, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent>
                  <Image src={d.img} alt={d.img} width={300} height={300} />
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
                  <Button variant="card" className="mt-5">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="" />
      <CarouselNext />
    </Carousel>
  );
}

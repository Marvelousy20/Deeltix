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
import {
  RestaurantPictures,
  SingleRestaurant,
  UserSingleRestaurant,
} from "@/types";
import ImageViewer from 'react-simple-image-viewer';
import { useCallback, useState } from "react";


interface DataProps {
  data: SingleRestaurant | undefined;
}

export default function AllRestaurants({ data }: DataProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
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
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };


  return (
    <div>
      {/* <Carousel
        opts={{
          align: "start",
        }}
        className="w-full mx-auto relative"
      >
        <CarouselContent className="flex gap-3">
          {data?.pictures?.map((photos, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/4 bg-transparent"
            >
              <div className="w-[300px] h-[200px]">
                <Image
                  src={photos}
                  width={400}
                  height={400}
                  alt="All restaurant"
                  className="w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:block" />
        <CarouselNext className="hidden lg:block" />
      </Carousel> */}
       <div className="flex gap-4 w-full h-[300px] overflow-scroll">
      {data?.pictures?.map((src, index) => (
        <Image
          src={ src }
          onClick={ () => openImageViewer(index) }
          width={400}
          height={400}
          key={ index }
          // style={{ margin: '2px' }}
          className="rounded-lg"
          alt="other-image"
        />
      ))}
       </div>

      {isViewerOpen && (
        <ImageViewer
          src={ data?.pictures || [] }
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000
          }}
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
      </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { MapPin, Star, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RestaurantDetails } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/axios-config';
import { toast } from 'react-toastify';
import { ErrorType, handleError } from '@/lib/handle-error';

export default function CarouselSlider({ data }: RestaurantDetails) {
  const router = useRouter();
  const query = useQueryClient();
  // const [bookmark, setBookmark] = useState(false);

  function handleShowDetail(restaurantName: string, restaurantId: string) {
    // router.push(`/${restaurantName}?restaurant=${restaurantId}`);
    router.push(`/restaurant/${restaurantId}`);
  }

  // request for bookmark
  const { mutate, isLoading: bookmarkLoading } = useMutation({
    mutationFn: async (restaurantid: string) =>
      await auth.patch(`/api/restaurants/${restaurantid}/bookmark`),
    mutationKey: ['bookmark'],
    onSuccess() {
      toast.success('Restaurant has been bookmarked');
      // setBookmark(true);
      query.invalidateQueries(['all-bookmark']);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  return (
    // <Carousel
    //   opts={{
    //     align: "start",
    //   }}
    //   className="w-full mx-auto relative"
    // >
    // <CarouselContent className="h-full lg:h-fit w-full ">
    // {data?.data?.restaurants?.map((d, index) => (
    // <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
    <div className="flex flex-col justify-center items-center">
      <div className="p-1 grid lg:grid-cols-3 grid-cols-1 gap-3">
        {data?.data?.restaurants?.map((d, index) => (
          <Card key={index}>
            <CardContent>
              <div className="relative">
                <figure className="h-[250px] w-full z-[999]">
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
                  {/* <Bookmark size={20} className="cursor-pointer" /> */}
                  <Bookmark
                    onClick={() => mutate(d.id)}
                    size={20}
                    color={'#2C2929'}
                    className="cursor-pointer"
                  />
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
                      <p className="text-sm">{d.address}</p>
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
        ))}
      </div>
      <div className="text-white font-bold flex items-center justify-center rounded hover:bg-opacity-70 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-opacity-70 mt-5">
        <Link href={'/restaurants'} className="bg-primary p-5 rounded-full">
          More Restaurants
        </Link>
      </div>
    </div>
    /* </CarouselItem> */
    // ))}
    /* </CarouselContent>
      <CarouselPrevious />
      <CarouselNext /> */
    // </Carousel>
  );
}

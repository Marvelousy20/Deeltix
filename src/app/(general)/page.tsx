"use client";
import { Input } from "@/components/ui/input";
import Food from "../../../public/food.png";
import Image from "next/image";
import CarouselSlider from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@mantine/hooks";
import UserDrawer from "@/components/Drawer";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { RestaurantDetails } from "@/types";
import { auth } from "@/axios-config";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryFn: async () => await auth.get<RestaurantDetails>(`/api/restaurants`),
    queryKey: ["restaurant-details"],
    select: ({ data }) => data?.data,
  });

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <main className="bg flex flex-col lg:block gap-10 lg:gap-0 overflow-hidden">
      <div className="bg-background lg:pt-32 pt-0">
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
        <div className="lg:max-w-[40rem] mt-20 max-w-[300px] mx-auto lg:text-[3.5rem] text-[2rem] text-center lg:pt-20 pt-5">
          <h1>
            Discover
            <span className="text-grayblack font-extrabold"> Restaurants </span>
            and make
            <span className="text-grayblack font-extrabold">
              {" "}
              Reservations.
            </span>
          </h1>

          <div className="flex items-center justify-center">
            <Input
              type="search"
              placeholder="Search for a restaurant, cuisine e.t.c"
              className="mt-8 px-6 py-6"
              icon="/searchArrow.png"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={Food}
            alt="food"
            // width={500}
            // height={500}
            // placeholder="blur"
            priority
            className="h-auto object-cover"
          />
        </div>
      </div>

      {/* Content till footer */}
      <div className="lg:mt-20 mt-0 lg:px-20 px-8">
        <div className="flex gap-10 lg:gap-0 flex-col">
          <div className="flex flex-col lg:gap-0 gap-10">
            <div className="flex items-center gap-x-2">
              <h3 className="lg:text-4xl text-2xl lg:font-medium font-bold pb-5">
                Top Restaurants for you
              </h3>
              <Image
                src="/glowing_star.svg"
                alt="glowing_stars"
                width={28}
                height={28}
                className="hidden lg:block"
              />
            </div>

            <div className="lg:mt-9 mt-0 flex items-center gap-3">
              {isLoading ? (
                <div className="flex flex-col lg:w-[350px] w-full space-y-3">
                  <Skeleton className="h-[250px] w-full lg:w-[250px] rounded-xl" />
                  <div className="flex w-full lg:w-[250px] items-center justify-between">
                    <Skeleton className="h-[10px] w-full lg:w-[100px] rounded-xl" />
                    <Skeleton className="h-[10px] w-full lg:w-[100px] rounded-xl" />
                  </div>
                  <Skeleton className="h-[50px] w-full rounded-2xl" />
                </div>
              ) : (
                <CarouselSlider data={data} />
              )}
            </div>
          </div>
          {/* <div className="lg:mt-20 mt-0 flex flex-col gap-10 lg:gap-0">
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

            <div className="lg:mt-9 mt-0">
              <CarouselSlider data={data} />
            </div>
          </div> */}
          {/* Handpicked restaurants */}
          {/* <div className="lg:mt-20 mt-0 flex flex-col gap-10 lg:gap-0">
            <div className="flex items-center gap-x-2">
              <h3 className="lg:text-4xl text-2xl lg:font-medium font-bold">
                Handpicked restaurants for you
              </h3>
              <Image
                src="/pinchedfingers.svg"
                alt="glowing_stars"
                width={28}
                height={28}
                className="hidden lg:block"
              />
            </div>

            <div className="lg:mt-9 mt-0">
              <CarouselSlider data={topRestaurentData} />
            </div>
          </div> */}
        </div>
        <div className="bg-milky rounded-[3rem] mt-16 lg:py-28 py-8 lg:flex space-y-8 lg:space-y-0 lg:px-20 px-8 items-center justify-between">
          <div className="lg:max-w-md w-full">
            <h1 className="lg:text-4xl text-2xl lg:font-medium font-bold max-w-[250px] lg:text-start text-center">
              Become a <span className="font-semibold">Partner</span> with us
              today
            </h1>
            <p className="mt-4 text-xl text-center lg:text-start">
              View and approve orders reservation, accept payments and view
              order analytics conveniently.
            </p>

            <div className="flex justify-between items-center gap-3 lg:gap-6 mt-8 w-full">
              <Link
                href="/restaurant-dashboard"
                className="bg-dark lg:text-base whitespace-nowrap text-sm font-normal text-white w-1/2 rounded-[2.5rem] h-12 px-4 items-center flex justify-center"
              >
                Get started now
              </Link>
              <Button className="bg-offwhite lg:text-base text-sm w-1/2 font-normal hover:bg-opacity-40">
                Learn more
              </Button>
            </div>

            <div className="pt-10">
              <span className="lg:text-2xl text-xl lg:font-medium font-bold text-center">
                Wanna discover places?
                <a href="" className="underline underline-offset-4">
                  Join Deeltix
                </a>
              </span>
            </div>
          </div>
          <div className="justify-self-end">
            <Image
              src="/compt.png"
              alt="compt"
              width={460}
              height={450}
              className=""
            />
          </div>
        </div>
      </div>
    </main>
  );
}

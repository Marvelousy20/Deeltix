import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Food from "../../public/food.png";
import Image from "next/image";
import CarouselSlider from "@/components/carousel";

export default function Home() {
  return (
    <main className="">
      <div className="bg-background">
        <Navbar />

        <div className="max-w-[40rem] mx-auto text-[3.5rem] text-center mt-20">
          <h1>
            Discover
            <span className="text-grayblack font-extrabold">retaurants</span>
            and make
            <span className="text-grayblack font-extrabold">reservations.</span>
          </h1>

          <Input
            type="search"
            placeholder="Search for a restaurant, cruisine e.t.c"
            className="mt-8 px-6 py-6"
          />
        </div>

        <div className="flex justify-center">
          <Image
            src={Food}
            alt="food"
            // width={500}
            // height={500}
            // placeholder="blur"

            priority
            // objectFit="cover"
            // className="w-auto"
            className="h-auto object-cover"
          />
        </div>
      </div>

      {/* Content til footer */}
      <div className="mt-20 px-4 lg:px-20">
        <CarouselSlider />
      </div>
    </main>
  );
}

"use client";
// import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Food from "../../public/food.png";
import Image from "next/image";
import CarouselSlider from "@/components/carousel";
import { topRestaurentData } from "@/components/data/TopRestaurant";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import Signup from "@/components/signup";
import Signin from "@/components/signin";
import ForgetPassword from "@/components/ForgetPassword";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [signUpModal, setsignUpModal] = useState(false);
  const [resetpassword, setResetpassword] = useState(false);

  useEffect(() => {
    console.log(showModal);
  });
  return (
    <main className="bg">
      <div className="bg-background pt-32">
        <div className="max-w-[40rem] mx-auto text-[3.5rem] text-center pt-20">
          <h1>
            Discover
            <span className="text-grayblack font-extrabold"> retaurants </span>
            and make
            <span className="text-grayblack font-extrabold">
              {" "}
              reservations.
            </span>
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
            className="h-auto object-cover"
          />
        </div>
      </div>

      {/* Content till footer */}
      <div className="mt-20 px-4 lg:px-20">
        <div>
          <div className="flex items-center gap-x-2">
            <h3 className="text-4xl font-medium">
              Top 10 restaurants in Lekki
            </h3>
            <Image
              src="/glowing_star.svg"
              alt="glowing_stars"
              width={28}
              height={28}
            />
          </div>

          <div className="mt-9">
            <CarouselSlider data={topRestaurentData} />
          </div>
        </div>

        {/* suggested location restaurants */}
        <div className="mt-20">
          <div className="flex items-center gap-x-2">
            <h3 className="text-4xl font-medium">Restaurants around Lekki</h3>
            <Image
              src="/greenheart.svg"
              alt="glowing_stars"
              width={28}
              height={28}
            />
          </div>

          <div className="mt-9">
            <CarouselSlider data={topRestaurentData} />
          </div>
        </div>

        {/* Handpicked restaurants */}
        <div className="mt-20">
          <div className="flex items-center gap-x-2">
            <h3 className="text-4xl font-medium">
              Handpicked restaurants for you
            </h3>
            <Image
              src="/pinchedfingers.svg"
              alt="glowing_stars"
              width={28}
              height={28}
            />
          </div>

          <div className="mt-9">
            <CarouselSlider data={topRestaurentData} />
          </div>
        </div>

        <div className="bg-milky rounded-[3rem] mt-20 py-28 grid grid-cols-2 lg:px-20 items-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-medium">
              Become a <span className="font-semibold">Partner</span> with us
              today
            </h1>
            <p className="mt-4 text-xl">
              View and approve orders reservation, accept payments and view
              order analytics conveniently.
            </p>

            <div className="flex justify-between gap-6 mt-8">
              <Button
                onClick={() => setShowModal(true)}
                className="bg-dark text-white w-full"
              >
                Get started now
              </Button>
              <Button
                onClick={() => setsignUpModal(true)}
                className="bg-offwhite w-full hover:bg-opacity-40"
              >
                Learn more
              </Button>
            </div>

            <div className="mt-10">
              <span className="">
                Wanna discover places?
                <a href="" className="underline underline-offset-4">
                  Join Deeltix
                </a>
              </span>
            </div>
          </div>
          <div
            onClick={() => setResetpassword(true)}
            className="justify-self-end"
          >
            <Image src="/compt.png" alt="compt" width={460} height={450} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Signup />
        </Modal>
      )}
      {signUpModal && (
        <Modal onClose={() => setsignUpModal(false)}>
          <Signin />
        </Modal>
      )}
      {resetpassword && (
        <Modal onClose={() => setResetpassword(false)}>
          <ForgetPassword />
        </Modal>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";

export default function RestaurantDashBoardNavbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="mx-4 md:mx-8 lg:mx-[3.5rem] xl:mx-[6.25rem] py-4 fixed top-8 left-0 right-0 backdrop-blur-md bg-white/85 px-8 rounded-[40px]">
      <div className="flex items-center justify-between relative">
        <Link href="/restaurant-dashboard">
          <Image src="/dashboard/dlogo.svg" alt="img" width="80" height="80" />
        </Link>
        <div className="md:hidden">
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        </div>

        <ul
          className={`md:flex items-center gap-x-7 ${
            isOpen
              ? "absolute top-10 flex-col space-y-8 bg-white left-0 right-0 p-8"
              : "hidden"
          }`}
        >
          <li className="font-medium" onClick={() => setOpen(false)}>
            <Link href="/restaurant-dashboard/contact">Contact Team</Link>
          </li>
          <li className="font-medium" onClick={() => setOpen(false)}>
            <Link href="/restaurant-signin">Log In</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/restaurant-registration">
              <div className="bg-primary text-white rounded-[40px] py-3 px-5 font-medium shadow-[0_4px_14px_0_rgb(0,0,0,20%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] transition duration-200 ease-linear">
                Get Started
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

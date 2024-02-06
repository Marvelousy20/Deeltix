"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export function ExcludeNavbar() {
  const pathName = usePathname();

  return pathName !== "/get-started" || ("/get-started/" && <Navbar />);
}

export function ExcludeFooter() {
  const pathName = usePathname();

  return pathName !== "/get-started" || ("/get-started/" && <Footer />);
}

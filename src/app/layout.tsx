import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resturants near you",
  description: "Discover Restaurants and make reservations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transact-scroll`}>
        <div className="hidden lg:flex">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}

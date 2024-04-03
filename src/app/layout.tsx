import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localfont from "next/font/local";
import { ProductProvider } from "@/context/restaurant/product";
import { UserProvider } from "@/context/user/user";

export const metadata: Metadata = {
  title: "Resturants near you",
  description: "Discover Restaurants and make reservations.",
};

const roman = localfont({
  src: "../../public/font/AeonikPro-Roman-VF.ttf",
  variable: "--font-roman",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryProvider>
        <ProductProvider>
          <UserProvider>
            <body className={`${roman.variable} font-roman transact-scroll`}>
              {children}
              <ToastContainer />
            </body>
          </UserProvider>
        </ProductProvider>
      </QueryProvider>
    </html>
  );
}

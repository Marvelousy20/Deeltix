import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/context/user";

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
      <QueryProvider>
        <body className={`${inter.className} transact-scroll`}>
          <UserProvider>{children}</UserProvider>
          <ToastContainer />
        </body>
      </QueryProvider>
    </html>
  );
}

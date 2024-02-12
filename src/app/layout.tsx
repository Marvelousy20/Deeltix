import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <div className="hidden lg:flex"></div>
        {children}
      </body>
    </html>
  );
}

// (Aut

//
//Create a escape folder (General)
// inside the folder, create a layout.tsx and then copy everything we have inside the root layout to the layout.tsx that was created and include your header and footer component.
// move the root page.tsx into the escape folder that was created and also move all folder that uses the navbar and footer into the escape folder.

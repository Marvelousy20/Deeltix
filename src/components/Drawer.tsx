"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import LoggedInNavbar from "./LoggedInUserNavbar";
import Navbar from "./Navbar";

function UserDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu color="white" size={30} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div
            className="flex
           justify-between items-start"
          >
            {/* <LoggedInNavbar /> */}
            <Navbar />
            <DrawerClose>
              <X color="white" size={30} />
            </DrawerClose>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
export default UserDrawer;

{
  /* <section className="mt-10 flex justify-between">
  <LoggedInNavbar />
  <div className="flex justify-end">
    <X color="black" size={30} />
  </div>
</section>; */
}

"use client";
import React from "react";
import { Breadcrumbs } from "./Breadcrumb";
import { MenuUpload } from "./MenuDetails";
import { Product } from "../ProductUpload";
import { RestaurantBackground } from "./RestaurantUpload";

export const Menu = () => {
  return (
    <div className="p-8 flex flex-col gap-[48px]">
      <Breadcrumbs breadcrumb={"Add first menu"} />
      {/* <MenuUpload /> */}
      <Product />
      {/* <RestaurantBackground /> */}
    </div>
  );
};

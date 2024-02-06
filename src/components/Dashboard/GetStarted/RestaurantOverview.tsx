"use client";
import React from "react";
import { Breadcrumbs } from "./Breadcrumb";
import { RestaurantForm } from "./form";

export const Overview = () => {
  return (
    <div className="p-8 flex flex-col gap-[48px]">
      <Breadcrumbs breadcrumb={"Restaurant overview"} />
      <RestaurantForm />
    </div>
  );
};

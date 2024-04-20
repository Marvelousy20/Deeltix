"use client";
import React from "react";
import { Breadcrumbs } from "./Breadcrumb";
import { RestaurantForm } from "./form";

export const Overview = () => {
  return (
    <div className="p-8 gap-[48px]">
      <Breadcrumbs
        firstText="Get Started"
        breadcrumb={"Restaurant overview"}
        action="Save"
        link="/get-started"
      />
      <RestaurantForm />
    </div>
  );
};

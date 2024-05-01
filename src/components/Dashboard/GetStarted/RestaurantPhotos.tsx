"use client";
import React from "react";
import { Breadcrumbs } from "./Breadcrumb";
import { RestaurantBackground } from "./RestaurantUpload";

export const MainPhotos = () => {
  return (
    <div className="p-8 flex flex-col gap-[48px]">
      <Breadcrumbs
        firstText="Get Started"
        breadcrumb={"Add photos"}
        action="Save"
      />
      <section className="flex flex-col items-center justify-center">
        <div className="border border-grayBottom rounded-[24px] p-[64px] w-fit">
          <RestaurantBackground />
        </div>
      </section>
    </div>
  );
};

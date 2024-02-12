"use client";
import React from "react";
import { Breadcrumbs } from "./Breadcrumb";
import { RestaurantBackground } from "./RestaurantUpload";
import { MultipleUpload } from "./MultipleFiles";

export const MainPhotos = () => {
  return (
    <div className="p-8 flex flex-col gap-[48px]">
      <Breadcrumbs breadcrumb={"Add photos"} />
      <section className="flex flex-col items-center justify-center">
        <div className="border border-grayBottom rounded-[24px] p-[64px] w-fit">
          <RestaurantBackground />
        </div>
      </section>
    </div>
  );
};

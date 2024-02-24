"use client";
import React from "react";
import { Headings } from "./Headings";
import { Cards } from "./Card";

export const GettingStarted = () => {
  return (
    <div className="lg:p-8 flex flex-col gap-8">
      <Headings
        user={"Welcome Cilantro"}
        detail={
          "We are glad to have you onboard. To get exposure you need a proper set up."
        }
      />
      <div className="px-4 lg:px-0">
        <Cards />
      </div>
    </div>
  );
};

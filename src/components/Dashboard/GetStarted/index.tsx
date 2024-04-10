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
          "Welcome aboard! Let’s get started by setting up your dashboard."
        }
      />
      <div className="px-4 lg:px-0">
        <Cards />
      </div>
    </div>
  );
};

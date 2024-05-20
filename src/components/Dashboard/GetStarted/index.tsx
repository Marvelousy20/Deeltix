"use client";
import React, { useEffect, useState } from "react";
import { Headings } from "./Headings";
import { Cards } from "./Card";

export const GettingStarted = () => {
  return (
    <div className="lg:p-8 flex flex-col gap-8 my-6 lg:my-0">
      <Headings
        user={"Welcome Cilantro"}
        detail={
          "Welcome onboard! Let’s get started by setting up your dashboard."
        }
      />
      <div className="px-4 lg:px-0">
        <Cards />
      </div>
    </div>
  );
};

"use client";
import React, { useEffect, useState } from "react";
import { Headings } from "./Headings";
import { Cards } from "./Card";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";

export const GettingStarted = () => {
  return (
    <div className="lg:p-8 flex flex-col gap-8">
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

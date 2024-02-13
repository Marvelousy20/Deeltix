import { Guests } from "@/components/Dashboard/GuestBook";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const GuestBook = () => {
  return (
    <DashboardLayout>
      <Guests />
    </DashboardLayout>
  );
};

export default GuestBook;

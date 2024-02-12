import { Overview } from "@/components/Dashboard/GetStarted/RestaurantOverview";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const RestaurantOverview = () => {
  return (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  );
};

export default RestaurantOverview;

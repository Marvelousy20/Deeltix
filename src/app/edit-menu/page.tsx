import { EditRestaurantMenu } from "@/components/EditMenu";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const DashboardStat = () => {
  return (
    <DashboardLayout>
      <EditRestaurantMenu />
    </DashboardLayout>
  );
};

export default DashboardStat;

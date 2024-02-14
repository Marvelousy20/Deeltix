import { CustomerMenu } from "@/components/Dashboard/Menu";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const Menu = () => {
  return (
    <DashboardLayout>
      <CustomerMenu />
    </DashboardLayout>
  );
};

export default Menu;

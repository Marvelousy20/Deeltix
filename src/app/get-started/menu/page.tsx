import { Breadcrumbs } from "@/components/Dashboard/GetStarted/Breadcrumb";
import { MenuUpload } from "@/components/Dashboard/GetStarted/MenuDetails";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const Menu = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <Breadcrumbs breadcrumb={"Add first menu"} />
      </div>
      <MenuUpload />
    </DashboardLayout>
  );
};

export default Menu;

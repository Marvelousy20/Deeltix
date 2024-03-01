import { Breadcrumbs } from "@/components/Dashboard/GetStarted/Breadcrumb";
import { MenuUpload } from "@/components/Dashboard/GetStarted/MenuDetails";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const Menu = () => {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        <Breadcrumbs
          firstText="Get Started"
          breadcrumb={"Add first menu"}
          action="save"
          link="/get-started"
        />
      </div>
      <MenuUpload />
    </DashboardLayout>
  );
};

export default Menu;

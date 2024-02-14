import { Breadcrumbs } from "@/components/Dashboard/GetStarted/Breadcrumb";
import { MenuUpload } from "@/components/Dashboard/GetStarted/MenuDetails";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight2 } from "iconsax-react";
import { Link } from "lucide-react";
import React from "react";

const Update = () => {
  return (
    <DashboardLayout>
      <section className="flex items-center justify-between p-8">
        <div className="flex items-center gap-2">
          <p className="text-base font-medium text-comment">
            <Link href="/menu">Menu</Link>
          </p>

          <ArrowRight2 size="16" />
          <p className="text-base font-medium text-comment">Add item</p>
        </div>
        <Button
          type="submit"
          className=" text-card font-medium text-sm bg-primary py-5 px-6 rounded-[40px] h-0"
        >
          Save
        </Button>
      </section>
      <MenuUpload />
    </DashboardLayout>
  );
};

export default Update;

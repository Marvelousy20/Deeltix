import { RestaurantQrCode } from "@/components/Dashboard/QRCODE/page";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const QrCodePage = () => {
  return (
    <DashboardLayout>
      <RestaurantQrCode />
    </DashboardLayout>
  );
};

export default QrCodePage;

import { UserWallet } from "@/components/Dashboard/Wallet";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import React from "react";

const Wallet = () => {
  return (
    <DashboardLayout>
      <UserWallet />
    </DashboardLayout>
  );
};

export default Wallet;

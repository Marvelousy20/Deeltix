import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { AtmCards } from "./CardLayout";

export const CardDetails = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white lg:pt-[56px] pt-6 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <h3 className=" text-4xl font-bold text-dark2">Cards</h3>
        </div>
        <section className="w-full flex items-center justify-center border border-grayoutline rounded-[32px]">
          <AtmCards />
        </section>
      </div>
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserAddressModal />
        </Modal>
      )} */}
    </div>
  );
};

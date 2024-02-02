import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Location } from "iconsax-react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { DeleteAddress } from "./DeleteAddressModal";
import Modal from "@/components/ui/Modal";

export const Cards = () => {
  const [showModal, setShowModal] = useState(false);
  const userAddress = [
    {
      id: 1,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
    {
      id: 2,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
    {
      id: 3,
      address: "Plot 24, Block 2, Lekki Lagos, Nigeria.",
    },
  ];
  return (
    <div className="w-full">
      <div className="p-6 grid lg:grid-cols-3 grid-cols-1 gap-2">
        {userAddress.map((item) => (
          <section
            key={item.id}
            className="flex flex-col gap-5 border border-grayoutline rounded-[20px] p-6"
          >
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#E8E8E8]">
              <Location size="20" color="#000000" />
            </div>

            <div className="">
              <p>{item?.address}</p>
            </div>

            <Button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-[#FFF0F0]"
            >
              <Trash2 color="#000" />
              <span>Delete</span>
            </Button>
          </section>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAddress />
        </Modal>
      )}
    </div>
  );
};

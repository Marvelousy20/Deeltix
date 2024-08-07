import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const AtmCards = () => {
  const [showModal, setShowModal] = useState(false);
  const userAddress = [
    {
      id: 1,
      type: "Master",
      cardNumber: "***5890",
      date: "09/2025",
    },
    {
      id: 2,
      type: "Visa",
      cardNumber: "***5890",
      date: "09/2025",
    },
    {
      id: 3,
      type: "Verse",
      cardNumber: "***5890",
      date: "09/2025",
    },
  ];
  return (
    <div className="w-full">
      <div className="lg:p-6 p-4 grid lg:grid-cols-3 grid-cols-1 gap-2">
        {userAddress.map((item) => (
          <section
            key={item.id}
            className="flex flex-col gap-5 border border-grayoutline rounded-[20px] p-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-[#E8E8E8]">
                <Image
                  src="/card.svg"
                  width={30}
                  height={30}
                  alt="card"
                  objectFit="cover"
                />
              </div>
              <h3>{item?.type}</h3>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg font-normal text-grayBlack2">
                {item?.cardNumber}
              </p>
              <div className="w-[1px] h-[15px] bg-grayoutline -rotate-180"></div>
              <p className="text-lg font-normal text-grayBlack2">
                {item?.date}
              </p>
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
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAddress />
        </Modal>
      )} */}
    </div>
  );
};

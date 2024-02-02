import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import UserAddressModal from "./AdressModal";

export const AddressEmptyState = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white pt-20 w-full">
      <div className="flex flex-col space-y-6 w-[90%] mx-auto">
        <div className="flex items-center justify-between">
          <h3 className=" text-4xl font-bold text-dark2">Address</h3>
          {/* <Button className="flex items-center gap-2 py-3 px-4 bg-card">
            <Plus />{" "}
            <span className="font-normal text-xl rounded-[40px] text-dark2">
              Add new address
            </span>
          </Button> */}
        </div>
        <section className="w-full py-[56px] flex items-center justify-center border border-grayoutline rounded-[32px]">
          <div className="flex flex-col items-center justify-center space-y-8">
            <figure className="rounded-full flex items-center justify-center h-[80px] w-[80px] border bg-milky border-grayoutline">
              <Image src="/order.png" width={50} height={50} alt="Order" />
            </figure>
            <p className=" text-2xl font-normal text-grayBlack2">
              There’s no saved address here
            </p>
            <Button
              onClick={() => setShowModal(true)}
              className="flex text-white items-center gap-2 py-3 px-4 bg-dark3"
            >
              <Plus />{" "}
              <span className="font-normal text-xl rounded-[40px] ">
                Add new address
              </span>
            </Button>
          </div>
        </section>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserAddressModal />
        </Modal>
      )}
    </div>
  );
};

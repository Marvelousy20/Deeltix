"use client";
import { Modal } from "@mantine/core";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { ArrowRight2 } from "iconsax-react";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { SingleReservationDetails } from "@/types";
import { useRouter } from "next/navigation";

export const ReservationModal = ({
  opened,
  close,
  reservationId,
}: {
  opened: any;
  close: () => void;
  reservationId: string;
}) => {
  const { push } = useRouter();

  const reviewDirection = (restaurantname: string, reservationId: string) => {
    push(`/${restaurantname}?restaurant=${reservationId}`);
  };

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<SingleReservationDetails>(
        `/api/reservations/single/${reservationId}`
      ),
    queryKey: ["single-reservation"],
    enabled: !!reservationId,
    select: ({ data }) => data?.data?.data?.reservation,
  });
  return (
    <div>
      <Modal
        id={reservationId}
        opened={opened}
        onClose={close}
        centered
        withCloseButton={true}
        size="30%"
      >
        <div className="">
          <div className="w-full h-[2px] bg-grayoutline mb-5"></div>
          <p>reservation {reservationId}</p>
          <Card className="w-full !bg-white !border-none">
            <CardContent className="">
              <div className="h-[250px] w-full ">
                <Image
                  src={data?.restaurant?.displayPicture as string}
                  alt="menu"
                  width={180}
                  height={180}
                  className="w-full h-full rounded-md object-contain"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <div className="flex justify-between items-center w-full">
                  <h3 className="font-bold text-xl text-grayBlack">
                    {data?.restaurant?.name}
                  </h3>

                  <p className="font-normal text-base text-grayHelp">
                    Order 1236779
                  </p>
                </div>
                <div className="flex items-center space-x-2 border-b-2 border-grayoutline py-2 ">
                  <p className="text-grayHelp text-base font-normal">{`${data?.date} at ${data?.time}`}</p>
                  <span className="h-3 w-[1px] bg-grayHelp"></span>
                  <p className="text-grayHelp text-base font-normal">{`${data?.numberOfPeople} guest`}</p>
                </div>
                <h3 className="border-b-2 border-grayoutline py-2 text-grayHelp text-base font-normal">
                  {data?.restaurant?.address}
                </h3>
                <div
                  onClick={() =>
                    reviewDirection(
                      data?.restaurant?.name as string | string,
                      data?.restaurant?.id as string
                    )
                  }
                  className="flex items-center justify-between py-2 cursor-pointer"
                >
                  <p>Write a review</p>
                  <ArrowRight2 color="#2C2929" />
                </div>
              </div>
              {/* <Button
                variant="card"
                className="mt-5 text-base font-medium text-grayBlack"
              >
                View order
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

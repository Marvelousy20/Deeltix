import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ReservationStatus } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useDisclosure } from "@mantine/hooks";
import { ReservationModal } from "./reservation-modal";
import { useState } from "react";

export interface Reservation {
  data: ReservationStatus[];
}

export default function ReservationCard({ data }: Reservation) {
  console.log("pending", data);
  const [opened, { open, close }] = useDisclosure();
  const [openedReservationId, setOpenedReservationId] = useState<string | null>(
    null
  );

  const handleCardClick = async (reservationId: string) => {
    setOpenedReservationId(reservationId);
    open();
  };

  return (
    <section className="grid grid-cols-3 gap-3">
      {data?.map((d, idx) => (
        <div className="p-1" key={idx}>
          <Card className="w-[300px]">
            <CardContent className="">
              <div className="h-[250px] w-full">
                <Image
                  src={d.restaurant?.displayPicture as string}
                  alt={d.restaurant?.displayPicture as string}
                  width={180}
                  height={180}
                  className="w-full rounded-md h-full object-cover"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1 whitespace-nowrap">
                <div className="">
                  <h3 className="font-medium text-lg text-grayBlack">
                    {d?.restaurant?.name}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-grayHelp text-base font-normal">
                    {/* {d?.date} */}
                    reserve {d?.id}
                  </p>
                  <p className="text-grayHelp text-base font-normal">
                    {` at ${d?.time}`}
                  </p>
                  <p className="text-grayHelp text-base font-normal">{`for ${d?.numberOfPeople} people`}</p>
                </div>
              </div>
              <Button
                onClick={() => handleCardClick(d?.id)}
                variant="card"
                className="mt-5 text-base font-medium text-grayBlack"
              >
                View order
              </Button>
            </CardContent>
          </Card>
          {openedReservationId === d.id && (
            <ReservationModal
              opened={opened}
              close={() => {
                close();
                setOpenedReservationId(null);
              }}
              reservationId={d.id}
            />
          )}
        </div>
      ))}
    </section>
  );
}

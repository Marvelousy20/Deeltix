"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { ReservationDropDown } from "./dropdown";
import { useUser } from "@/context/restaurant/user";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";

export const ReservationDetails = ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const { restaurantId } = useUser();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      await api.patch(
        `/api/reservations/${restaurantId}/confirm/${reservationId}`,
        data
      ),
    mutationKey: ["accept-reservation", "accept"],
    onSuccess() {
      toast.success("Accepted");
      queryClient.invalidateQueries([
        "pending-reservation",
        "upcoming-reservation",
      ]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  return (
    <div>
      <div className="rounded-[32px]">
        <DropdownMenu>
          <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
            <ReservationDropDown
              onAccept={() => mutate({ status: "Accepted" })}
              onReject={""}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

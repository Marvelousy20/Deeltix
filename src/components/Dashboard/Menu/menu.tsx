"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuDropDown } from "./menudropdown";
import { MoreHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios-config";

export const MenuDetails = ({
  id,
  restaurantId,
}: {
  id: string;
  restaurantId: string;
}) => {
  const queryClient = useQueryClient();

  const deleteMenu = async () => {
    const response = await api.delete(
      `/api/restaurants/${restaurantId}/menu/${id}`
    );
    return response.data;
  };

  const { mutateAsync } = useMutation(deleteMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu"] });
    },
  });

  const handleDeleteMenu = async () => {
    try {
      await mutateAsync();
      console.log("Menu deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="rounded-[32px]">
        <DropdownMenu>
          <DropdownMenuTrigger className="!border-none !outline-none bg-transparent">
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl border border-grayoutline mt-10">
            <MenuDropDown onDelete={handleDeleteMenu} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

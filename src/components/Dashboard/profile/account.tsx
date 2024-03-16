"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/restaurant/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { IProfileUpdate } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Enter full name",
  }),
  phoneNumber: z.string().min(11, {
    message: "Number must be at least 11 character longer",
  }),
});
export const RestaurantAccount = () => {
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
    },
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IProfileUpdate) =>
      await api.patch(`/api/restaurant-manager/profile`, data),
    mutationKey: ["manager-profile", "manager"],
    onSuccess() {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["manager-restaurant-profile"]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="border border-grayBottom rounded-[24px] p-4 md:p-9 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex item-center justify-between pb-5">
            <h3 className="text-xl font-bold text-grayBlack2">
              Account settings
            </h3>
            <Button
              type="submit"
              className="w-fit !h-0 !py-4 !px-4 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <p>Saving</p>
                  <Loader size="sm" />
                </div>
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-grayHelp text-lg font-medium">
                Full name
              </label>
              <Input
                placeholder="Enter full name"
                className="text-grayInactive text-lg font-normal mt-2 w-full"
                {...register("fullName", {
                  required: true,
                })}
              />
              {errors.fullName && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.fullName.message}
                </div>
              )}
            </div>

            <div>
              <label className="text-grayHelp text-lg font-medium">
                Phone number
              </label>
              <Input
                placeholder="Enter phone number"
                className="text-grayInactive text-lg font-normal mt-2 w-full"
                {...register("phoneNumber", {
                  required: true,
                })}
              />
              {errors.phoneNumber && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

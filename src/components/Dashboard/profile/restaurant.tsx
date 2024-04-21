"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ProductProvider, useProduct } from "@/context/restaurant/product";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "../../ui/input";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { states } from "./state";
import { useSearchParams } from "next/navigation";
import { api } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { IUpdateRestaurantProfile } from "@/types/index";
import { useUser } from "@/context/restaurant/user";
import { Loader } from "@mantine/core";

const formSchema = z.object({
  address: z.string().min(10),
  state: z.string().min(2, {
    message: "Enter your state",
  }),
  country: z.string().min(5, {
    message: "Enter your state",
  }),
  averagePrice: z.string().min(5, {
    message: "Enter price",
  }),

  description: z.string().min(10, {
    message: "provide information about your restaurant",
  }),
  openDay: z.string().min(6, {
    message: "Enter your opening day",
  }),
  closeDay: z.string().min(6, {
    message: "Enter your closing day",
  }),
  openTime: z.string().min(2, {
    message: "Enter your opening time",
  }),
  closeTime: z.string().min(2, {
    message: "Enter your closing time",
  }),
});

export const RestaurantProfile = ({
  displayPicture,
}: {
  displayPicture: string;
}) => {
  const query = useQueryClient();
  const { banner } = useProduct();
  const { restaurantId } = useUser();
  const param = useSearchParams();
  const newResult = param?.get("uploads");
  const pictures = newResult?.split(",");
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      state: "",
      country: "",
      averagePrice: "",
      description: "",
      openDay: "",
      closeDay: "",
      openTime: "",
      closeTime: "",
    },
  });
  // country
  const { data } = useQuery({
    queryFn: async () =>
      await axios.get("https://restcountries.com/v3.1/all", {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    queryKey: ["countries"],
  });

  // const newSchema = formSchema.omit({ openDay: true, closeDay: true });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IUpdateRestaurantProfile) =>
      await api.patch(`/api/restaurants/profile/${restaurantId}`, data),
    mutationKey: ["update-restaurant-profile"],
    onSuccess(data) {
      toast.success("Profile updated successfully");
      query.invalidateQueries(["restaurant-details"]);
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const openingDays = `${values.openDay} ${values.closeDay}`;
    const openingHours = `${values.openTime} ${values.closeTime}`;
    const { openDay, closeDay, openTime, closeTime, ...others } = values;
    mutate({
      ...others,
      openingDays,
      openingHours,
      displayPicture,
      banner,
    });

    console.log("others :", {
      ...others,
      openingDays,
      openingHours,
      displayPicture,
    });
  };
  return (
    <div className="">
      <section className="">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-grayHelp text-lg font-medium">Bio</label>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none  mt-2"
                {...register("description")}
              />
              <p className="pt-3">
                NB: Be very expressive with your offerings 😉
              </p>
              {errors.description && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.description?.message}
                </div>
              )}
            </div>

            {/* address */}
            <div>
              <label className="text-grayHelp text-lg font-medium">
                <div className="flex items-center justify-between w-full">
                  <p>Address</p>
                  <div className="flex items-center text-[#574DFF] text-sm gap-1 cursor-pointer font-normal">
                    <MapPin size={16} />
                    <p className="text-sm font-normal">use current location</p>
                  </div>
                </div>
              </label>
              <Input
                placeholder="Lekki Phase 1, Lekki, Lagos, Nigeria"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("address")}
              />
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.address?.message}
              </div>
            </div>
            {/* state */}
            <div>
              <label className="text-grayHelp text-lg font-medium">State</label>

              <Select
                onValueChange={(value) =>
                  setValue("state", value, {
                    shouldValidate: true,
                  })
                }
                defaultValue={watch().state}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select your state"
                    className="text-grayInactive text-lg font-normal"
                  />
                </SelectTrigger>
                <SelectContent className="text-grayInactive text-lg font-normal">
                  {states.map((state, _i) => (
                    <SelectItem key={_i} className="rounded-xl" value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.state?.message}
              </div>
            </div>
            {/* country */}
            <div>
              <label className="text-grayHelp text-lg font-medium">
                Country
              </label>

              <Select
                onValueChange={(value) =>
                  setValue("country", value, {
                    shouldValidate: true,
                  })
                }
                defaultValue={watch().country}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select your country"
                    className="text-grayInactive text-lg font-normal"
                  />
                </SelectTrigger>
                <SelectContent className="text-grayInactive text-lg font-normal">
                  {/* {data?.data?.map((country: any, _i: any) => (
                    <SelectItem
                      key={_i}
                      className="rounded-xl"
                      value={country?.name?.common}
                    >
                      {country?.name?.common}
                    </SelectItem>
                  ))} */}
                  <SelectItem className="rounded-xl" value="Nigeria">
                    Nigeria
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.country?.message}
              </div>
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Average price
              </label>
              <Input
                type="number"
                placeholder="Enter your average price"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("averagePrice")}
              />
              {errors.averagePrice && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.averagePrice?.message}
                </div>
              )}
            </div>

            <div className="h-[1px] w-full bg-[#D0D5DD]"></div>

            <section className="flex flex-col gap-6">
              <article className="flex items-center gap-3 justify-between lg:max-w-[27rem]">
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Open at
                  </label>
                  <Input
                    placeholder="Monday"
                    className="text-grayInactive text-lg font-normal w-full mt-2"
                    {...register("openDay")}
                  />
                  {errors.openDay && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.openDay?.message}
                    </div>
                  )}
                </div>

                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Close from
                  </label>
                  <Input
                    placeholder="Sunday"
                    className="text-grayInactive text-lg font-normal w-full mt-2"
                    {...register("closeDay", {
                      required: true,
                    })}
                  />
                  {errors.closeDay && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.closeDay?.message}
                    </div>
                  )}
                </div>
              </article>

              <article className="flex items-center gap-3 justify-between lg:max-w-[27rem]">
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    From
                  </label>
                  <Input
                    placeholder="9:00 AM"
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("openTime", {
                      required: true,
                    })}
                  />
                  {errors.openTime && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.openTime?.message}
                    </div>
                  )}
                </div>

                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    To
                  </label>
                  <Input
                    placeholder="9:00 AM"
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("closeTime", {
                      required: true,
                    })}
                  />
                  {errors.closeTime && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.closeTime?.message}
                    </div>
                  )}
                </div>
              </article>
              <Button
                type="submit"
                className="w-full !px-4 py-2 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-white font-medium text-xl">
                    <p>Submitting</p>
                    <Loader size="sm" />
                  </span>
                ) : (
                  <p className="text-white font-medium text-xl">Submit</p>
                )}
              </Button>
            </section>
          </div>
        </form>
      </section>
    </div>
  );
};

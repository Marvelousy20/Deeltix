"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ProductProvider, useProduct } from "@/context/restaurant/product";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { Input } from "../../ui/input";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { states, weekDays } from "./state";
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
  name: z.string().min(2, {
    message: "Enter rrestaurant's name",
  }),
  country: z.string().min(5, {
    message: "Enter your state",
  }),
  averagePrice: z.string().min(3, {
    message: "Enter price",
  }),

  description: z.string().min(10, {
    message: "provide information about your restaurant",
  }),
  openingDay: z.string().min(6, {
    message: "Enter your opening day",
  }),
  closingDay: z.string().min(6, {
    message: "Enter your closing day",
  }),
  openingHour: z.string().min(2, {
    message: "Enter your opening time",
  }),

  closingHour: z.string().min(2, {
    message: "Enter your closing time",
  }),
});

export const RestaurantProfile = ({
  displayPicture,
  user,
}: {
  displayPicture: string;
  user: any;
}) => {
  const restaurant = user.data.data.restaurant;
  const [openTime, setOpenTime] = useState<string>(restaurant.openingHour);
  const handleChangeOpen = (value: any) => {
    setOpenTime(value);
  };
  const [closeTime, setCloseTime] = useState<string>(restaurant.closingHour);
  const handleChangeClose = (value: any) => {
    setCloseTime(value);
  };

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
      name: restaurant.name,
      address: restaurant.address,
      state: restaurant.state,
      country: restaurant.country,
      averagePrice: restaurant.averagePrice.toString(),
      description: restaurant.description,
      openingDay: restaurant.openingDay,
      closingDay: restaurant.closingDay,
      openingHour: restaurant.openingHour,
      closingHour: restaurant.closingHour,
    },
  });
  // country
  // const { data } = useQuery({
  //   queryFn: async () =>
  //     await axios.get("https://restcountries.com/v3.1/all", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }),
  //   queryKey: ["countries"],
  // });

  // IUpdateRestaurantProfile
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      await api.patch(`/api/restaurants/profile/${restaurantId}`, data),
    mutationKey: ["restaurant-profile", "user"],
    onSuccess(data) {
      toast.success("Profile updated successfully");
      query.invalidateQueries(["restaurant-details"]);
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  function convertTo12HourFormat(selectedTime: string) {
    let [hours, minutes] = selectedTime.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    let formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
    return formattedTime;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const openingHour = convertTo12HourFormat(values.openingHour);
    const closingHour = convertTo12HourFormat(values.closingHour);
    mutate({ ...values, closingHour, openingHour });
    // mutate(values);
    reset();
  };
  return (
    <section className="">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {/* restaurant Name */}
          <div>
            <label className="text-grayHelp text-lg font-medium">
              <div className="flex items-center justify-between w-full">
                <p>Name</p>
              </div>
            </label>
            <Input
              placeholder="Deluxe Kitchen"
              className="text-grayInactive text-lg font-normal mt-2"
              {...register("name")}
            />
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.name?.message}
            </div>
          </div>
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
          <div className="relative">
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
          <div className="relative">
            <label className="text-grayHelp text-lg font-medium">Country</label>

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
            <article className="flex items-center gap-3 lg:max-w-[27rem]">
              <div className="w-full relative">
                <label className="text-grayHelp text-lg font-medium">
                  Open at
                </label>

                <Select
                  onValueChange={(value) =>
                    setValue("openingDay", value, {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={watch().openingDay}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select opening days"
                      className="text-grayInactive text-lg font-normal"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-grayInactive text-lg font-normal">
                    {weekDays.map((week, _i) => (
                      <SelectItem key={_i} className="rounded-xl" value={week}>
                        {week}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.openingDay && (
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.openingDay?.message}
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <label className="text-grayHelp text-lg font-medium">
                  Close from
                </label>
                <article className="flex items-center justify-between w-full gap-5">
                  <div className="w-full">
                    <label className="text-grayHelp text-lg font-medium">
                      From
                    </label>
                    <Input
                      value={closeTime}
                      placeholder="9:00 AM"
                      type="time"
                      className="text-grayInactive text-lg font-normal mt-2"
                      customMaxWidth="w-full"
                      {...register("openingHour", {
                        required: true,
                      })}
                    />
                    {errors.openingHour && (
                      <div className="text-red-500 text-sm font-normal pt-1">
                        {errors.openingHour?.message}
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <label className="text-grayHelp text-lg font-medium">
                      To
                    </label>
                    <Input
                      value={openTime}
                      type="time"
                      className="text-grayInactive text-lg font-normal mt-2"
                      customMaxWidth="w-full"
                      {...register("closingHour", {
                        required: true,
                      })}
                    />
                    {errors.closingHour && (
                      <div className="text-red-500 text-sm font-normal pt-1">
                        {errors.closingHour?.message}
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
  );
};

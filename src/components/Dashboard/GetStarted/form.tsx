"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/restaurant/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states, weekDays } from "../profile/state";
import { Input } from "../../ui/input";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUpdateRestaurantOverview } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  emailAddress: z.string().email(),
  address: z.string().min(10),
  state: z.string().min(5, {
    message: "Select a value",
  }),
  zipCode: z.string().min(5, {
    message: "Code must be at least 5 characters",
  }),
  phoneNumber: z.string().min(11, {
    message: "Number must be at least 11 character longer",
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
export const RestaurantForm = () => {
  const router = useRouter();
  const { fetchUser, restuarantName, managerName, restaurantId } = useUser();
  const query = useQueryClient();
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      emailAddress: "",
      description: "",
      zipCode: "",
      state: "",
      phoneNumber: "",
      openingDay: "",
      closingDay: "",
      openingHour: "",
      closingHour: "",
    },
  });
  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IUpdateRestaurantOverview) =>
      // console.log(`/api/restaurants/profile/${restaurantId}`),
      await api.patch(`/api/restaurants/profile/${restaurantId}`, data),
    mutationKey: ["update-restaurant-profile"],
    onSuccess(data) {
      toast.success("Profile updated successfully");
      query.invalidateQueries(["restaurant-details"]);
      reset();
      router.push("/get-started/menu");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate(values);
    reset();
  };
  return (
    <div className="max-w-2xl mx-auto">
      <section className="border border-grayBottom rounded-[24px] p-[64px] w-full">
        <h3 className="text-xl font-bold text-grayBlack2 pb-8">
          Restaurant Overview
        </h3>
        {/* <Form {...form}> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <div className="w-full">
            <label className="text-grayHelp text-lg font-medium">
              Restaurant email address
            </label>
            <Input
              type="email"
              placeholder="email"
              className="text-grayInactive text-lg font-normal mt-2"
              customMaxWidth="w-full"
              {...register("emailAddress")}
            />
            {errors.emailAddress && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.emailAddress?.message}
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="text-grayHelp text-lg font-medium">
              <div className="flex items-center justify-between w-[300px]">
                <p>{"Restaurant's Address"}</p>
                {/* <div className="flex items-center text-[#574DFF] text-sm gap-1 cursor-pointer font-normal">
                  <MapPin size={16} />
                  <p className="text-sm font-normal">use current location</p>
                </div> */}
              </div>
            </label>
            <Input
              placeholder="Full address"
              className="text-grayInactive text-lg font-normal mt-2"
              {...register("address")}
              customMaxWidth="w-full"
            />
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.address?.message}
            </div>
          </div>

          {/* select input */}
          <div className="w-full">
            <label className="text-grayHelp text-lg font-medium">State</label>

            <div className="w-full">
              <Select
                onValueChange={(value) =>
                  setValue("state", value, {
                    shouldValidate: true,
                  })
                }
                defaultValue={watch().state}
              >
                <SelectTrigger className="w-full" customMaxWidth="w-full">
                  <SelectValue
                    placeholder="Select your state"
                    className="text-grayInactive text-lg font-normal"
                  />
                </SelectTrigger>
                <SelectContent className="text-grayInactive text-lg font-normal w-full">
                  {states.map((state, _i) => (
                    <SelectItem key={_i} className="rounded-xl" value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.state?.message}
            </div>
          </div>

          <div>
            <label className="text-grayHelp text-lg font-medium">
              Zip code
            </label>
            <Input
              placeholder="00000"
              className="text-grayInactive text-lg font-normal mt-2"
              customMaxWidth="w-full"
              {...register("zipCode", {
                required: true,
              })}
            />
            {errors.zipCode && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.zipCode?.message}
              </div>
            )}
          </div>

          <div>
            <label className="text-grayHelp text-lg font-medium">
              Phone number
            </label>
            <Input
              placeholder="+2348100000000"
              className="text-grayInactive text-lg font-normal mt-2"
              customMaxWidth="w-full"
              {...register("phoneNumber", {
                required: true,
              })}
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.phoneNumber?.message}
              </div>
            )}
          </div>

          <div className="h-[1px] w-full bg-[#D0D5DD]"></div>

          <div>
            <label className="text-grayHelp text-lg font-medium">Bio</label>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none mt-2"
              customMaxWidth="w-full"
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

          <section className="flex flex-col gap-6">
            <article className="flex items-center justify-between w-full gap-5">
              <div className="w-full">
                <label className="text-grayHelp text-lg font-medium">
                  Open at
                </label>
                {/* <Input
                  placeholder="Monday"
                  className="text-grayInactive text-lg font-normal !w-[140px] mt-2"
                  {...register("openDay")}
                />
                {errors.openDay && (
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.openDay?.message}
                  </div>
                )} */}
                <Select
                  onValueChange={(value) =>
                    setValue("openingDay", value, {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={watch().state}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Open"
                      className="text-grayInactive text-lg font-normal"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-grayInactive text-lg font-normal">
                    {weekDays.map((day, _i) => (
                      <SelectItem key={_i} className="rounded-xl" value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="text-grayHelp text-lg font-medium">
                  Close from
                </label>
                {/* <Input
                  placeholder="Sunday"
                  className="text-grayInactive text-lg font-normal !w-[140px] mt-2"
                  {...register("closeDay", {
                    required: true,
                  })}
                /> */}
                <Select
                  onValueChange={(value) =>
                    setValue("closingDay", value, {
                      shouldValidate: true,
                    })
                  }
                  defaultValue={watch().state}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Close"
                      className="text-grayInactive text-lg font-normal"
                    />
                  </SelectTrigger>
                  <SelectContent className="text-grayInactive text-lg font-normal">
                    {weekDays.map((day, _i) => (
                      <SelectItem key={_i} className="rounded-xl" value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.closingDay && (
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.closingDay?.message}
                  </div>
                )}
              </div>
            </article>

            <article className="flex items-center justify-between w-full gap-5">
              <div className="w-full">
                <label className="text-grayHelp text-lg font-medium">
                  From
                </label>
                <Input
                  placeholder="9:00 AM"
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
                <label className="text-grayHelp text-lg font-medium">To</label>
                <Input
                  placeholder="9:00 AM"
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
          </section>
          <Button type="submit" className="bg-blue-500 text-white p-6">
            submit
          </Button>
        </form>
      </section>
    </div>
  );
};

"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

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

const formSchema = z.object({
  emailAddress: z.string().email(),
  address: z.string().min(10),
  state: z.string().min(5, {
    message: "Select a value",
  }),
  code: z.string().min(5, {
    message: "Code must be at least 5 characters",
  }),
  number: z.string().min(11, {
    message: "Number must be at least 11 character longer",
  }),
  bio: z.string().min(10, {
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
export const RestaurantForm = () => {
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      address: "",
      state: "",
      code: "",
      number: "",
      bio: "",
      openDay: "",
      closeDay: "",
      openTime: "",
      closeTime: "",
    },
  });
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="border border-grayBottom rounded-[24px] p-[64px] w-fit hide">
        <h3 className="text-xl font-bold text-grayBlack2 pb-8">
          Restaurant Overview
        </h3>
        {/* <Form {...form}> */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="">
            <label className="text-grayHelp text-lg font-medium">
              Restaurant email address
            </label>
            <Input
              type="email"
              placeholder="cilantro@gmail.com"
              className="text-grayInactive text-lg font-normal mt-2"
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

          {/* select input */}
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
                {[
                  { label: "Lagos", value: "lagos" },
                  { label: "Delta", value: "delta" },
                  { label: "Oyo", value: "oyo" },
                ].map((state, _i) => (
                  <SelectItem
                    key={_i}
                    className="rounded-xl"
                    value={state.value}
                  >
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.state?.message}
            </div>
          </div>

          <div>
            <label className="text-grayHelp text-lg font-medium">
              Zip code
            </label>
            <Input
              placeholder="cilantro@gmail.com"
              className="text-grayInactive text-lg font-normal mt-2"
              {...register("code", {
                required: true,
              })}
            />
            {errors.code && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.code?.message}
              </div>
            )}
          </div>

          <div>
            <label className="text-grayHelp text-lg font-medium">
              Phone number
            </label>
            <Input
              placeholder="cilantro@gmail.com"
              className="text-grayInactive text-lg font-normal mt-2"
              {...register("number", {
                required: true,
              })}
            />
            {errors.number && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.number?.message}
              </div>
            )}
          </div>

          <div className="h-[1px] w-[300px] bg-[#D0D5DD]"></div>

          <div>
            <label className="text-grayHelp text-lg font-medium">Bio</label>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none  mt-2"
              {...register("bio")}
            />
            <p className="pt-3">
              NB: Be very expressive with your offerings 😉
            </p>
            {errors.bio && (
              <div className="text-red-500 text-sm font-normal pt-1">
                {errors.bio?.message}
              </div>
            )}
          </div>

          <section className="flex flex-col gap-6">
            <article className="flex items-center justify-between w-[300px]">
              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Open at
                </label>
                <Input
                  placeholder="Monday"
                  className="text-grayInactive text-lg font-normal w-[140px] mt-2"
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
                  className="text-grayInactive text-lg font-normal w-[140px] mt-2"
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

            <article className="flex items-center justify-between w-[300px]">
              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  From
                </label>
                <Input
                  placeholder="9:00 AM"
                  className="text-grayInactive text-lg font-normal w-[140px] mt-2"
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
                <label className="text-grayHelp text-lg font-medium">To</label>
                <Input
                  placeholder="9:00 AM"
                  className="text-grayInactive text-lg font-normal w-[140px] mt-2"
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
          </section>
          {/* <Button type="submit" className="text-green-500 p-6">
            submit
          </Button> */}
        </form>
      </section>
    </div>
  );
};

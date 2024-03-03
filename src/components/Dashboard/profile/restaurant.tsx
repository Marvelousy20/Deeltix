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
import { ProfileUpload } from "./picture-upload";

const formSchema = z.object({
  emailAddress: z.string().email(),
  address: z.string().min(10),

  name: z.string().min(5, {
    message: "Enter restaurant name",
  }),
  number: z.string().min(11, {
    message: "Number must be at least 11 character longer",
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
export const RestaurantProfile = () => {
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      address: "",
      name: "",
      number: "",
      description: "",
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
      <section className="border border-grayBottom rounded-[24px] p-9 w-fit hide">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex item-center justify-between">
            <h3 className="text-xl font-bold text-grayBlack2">
              Restaurant details
            </h3>
            <Button
              type="submit"
              className="w-fit px-4 py-2 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
            >
              Save
            </Button>
          </div>

          <ProfileUpload />

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-grayHelp text-lg font-medium">
                Restaurant name
              </label>
              <Input
                placeholder="Enter restaurant name"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.name?.message}
                </div>
              )}
            </div>

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
                  <label className="text-grayHelp text-lg font-medium">
                    To
                  </label>
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
          </div>
        </form>
      </section>
    </div>
  );
};

"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  emailAddress: z.string().email(),
  lastName: z.string().min(5, {
    message: "Enter last name",
  }),

  name: z.string().min(5, {
    message: "Enter first name",
  }),
  number: z.string().min(11, {
    message: "Number must be at least 11 character longer",
  }),
});
export const RestaurantAccount = () => {
  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      lastName: "",
      name: "",
      number: "",
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
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex item-center justify-between pb-5">
            <h3 className="text-xl font-bold text-grayBlack2">
              Account settings
            </h3>
            <Button
              type="submit"
              className="w-fit px-4 py-2 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
            >
              Save
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-grayHelp text-lg font-medium">
                First name
              </label>
              <Input
                placeholder="Enter first name"
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

            <div>
              <label className="text-grayHelp text-lg font-medium">
                Last name
              </label>
              <Input
                placeholder="Enter last name"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("lastName", {
                  required: true,
                })}
              />
              {errors.lastName && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.lastName?.message}
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
                Phone number
              </label>
              <Input
                placeholder="Enter phone number"
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
          </div>
        </form>
      </section>
    </div>
  );
};

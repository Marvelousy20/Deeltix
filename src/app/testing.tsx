"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
export const AdvancedPage = () => {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Enter food name",
    }),
    description: z.string().min(10, {
      message: "Enter food description",
    }),

    price: z.string().min(2, {
      message: "Enter food price",
    }),
  });

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    reset();
  };
  return (
    <div className="p-8 gap-[48px] flex flex-col">
      {/* <Breadcrumbs breadcrumb={"Add first menu"} /> */}

      <section className="flex flex-col items-center justify-center ">
        <div className="border border-grayBottom rounded-[24px] p-[64px] w-fit">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-[147px]"
          >
            <div className="">
              <h3 className="text-xl font-bold text-grayBlack2 pb-8">
                Menu details
              </h3>
              {/* name */}
              <div className="flex flex-col gap-6">
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Full name
                  </label>
                  <Input
                    placeholder="eg. Fried rice"
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.name?.message}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Description DeelTix's
                  </label>
                  <Textarea
                    placeholder="Seasoned with curry, thyme"
                    className="resize-none  mt-2"
                    {...register("description")}
                  />

                  {errors.description && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.description?.message}
                    </div>
                  )}
                </div>

                {/* price */}
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Price
                  </label>
                  <Input
                    placeholder="₦5,000.00"
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("price")}
                  />
                  {errors.price && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.price?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/*  file upload */}

            <Button type="submit" className="bg-blue-600 text-white">
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

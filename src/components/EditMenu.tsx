"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { IMenus } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useUser } from "@/context/restaurant/user";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useProduct } from "@/context/restaurant/product";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface IEditMenu {
  name: string;
  description: string;
  price: string;
  image: string[];
}

export const EditRestaurantMenu = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menuid");
  const menurestaurantId = searchParams.get("restaurantid");
  const router = useRouter();
  const { restaurantId } = useUser();
  const { url, setUrl } = useProduct();
  const { push } = useRouter();
  //endpoint to fetch single menu
  const { data } = useQuery({
    queryFn: async () =>
      await api.get(`/api/restaurants/${menurestaurantId}/menu/single/${menuId}
    `),
    queryKey: ["single-menu"],
  });

  //Endpoint to edit menu
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IEditMenu) =>
      await api.patch(
        `/api/restaurants/${menurestaurantId}/menu/${menuId}
    `,
        data
      ),
    mutationKey: ["edit-menu"],
    onSuccess() {
      push("/menu");
      toast.success("Menu edited successfully");

      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

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
      name: data?.data?.data?.data?.menu?.name,
      description: data?.data?.data?.data?.menu?.description,
      price: data?.data?.data?.data?.menu?.price,
    },
  });
  const { errors } = formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const datas = { ...values, image: data?.data?.data?.data?.menu?.image };
    mutate(datas);
  };

  return (
    <div className="p-4 lg:p-8 lg:gap-[48px] flex flex-col">
      <section className="lg:flex flex-col items-center justify-center w-full">
        <div className="lg:border border-grayBottom rounded-[24px] py-8 lg:p-[4rem] lg:w-fit">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row items-start gap-10 lg:gap-[9.1rem] w-full"
          >
            <div className="w-full">
              <h3 className="text-xl font-bold text-grayBlack2 pb-8">
                Menu details
              </h3>
              {/* name */}
              <div className="flex flex-col gap-6 w-full">
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Name
                  </label>
                  <Input
                    placeholder="eg. Fried rice"
                    className="text-grayInactive text-lg font-normal mt-2"
                    // customMaxWidth="100px"
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
                    Description
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

                {/* Select input */}

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
            {/* <div>
              <Product />
            </div> */}

            <Button
              type="submit"
              className="bg-blue-600 text-white w-full"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Product } from "./ProductUpload";
import { Breadcrumbs } from "./Breadcrumb";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { IMenus } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useUser } from "@/context/user";
import { useQuery } from "@tanstack/react-query";
import AddMenu from "../Menu/addMenu";
import { useDisclosure } from "@mantine/hooks";


type categoryType = {
  id: string;
  name: string;
};

export const MenuUpload = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [categories, setCategories] = useState<categoryType[] | null>(null);
  const { restaurantId } = useUser();
  const handleFileNameChange = (newFileName: string | null) => {
    setFileName(newFileName);
  };

  // console.log(restaurantId);
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Enter food name",
    }),
    description: z.string().min(10, {
      message: "Enter food description",
    }),
    category: z.string().min(2, {
      message: "Enter food category",
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
      category: "",
      price: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IMenus) => {
      await api.post(`/api/restaurants/${restaurantId}/menu`, data);
    },
    mutationKey: ["menu, restuarant"],
    onSuccess() {
      toast.success("Yuppy! Menu added successfully.");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log("fileName", fileName);cons

    const data = { ...values, image: fileName };
    mutate(data);

    reset();
  };

  const fetchCategory = async () => {
    if (!restaurantId) {
      return;
    }
    try {
      const result = await api.get(
        `/api/restaurants/${restaurantId}/menu/categories/all`
      );
      const allCategories = result.data.data.data;
      setCategories(allCategories.menuCategories);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryFn: fetchCategory,
    queryKey: ["category resturant"],
  });

  useEffect(() => {
    fetchCategory();
  }, [restaurantId]);

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
                    Name
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
                <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Category
                  </label>

                  <div className="mb-2 bg-blue-600 text-white w-fit p-1.5 rounded-full">
                    <p onClick={() =>open() } className="">Add Category</p>
                  </div>

                  <Select
                    onValueChange={(value) =>
                      setValue("category", value, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={watch().category}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="eg.  Seafood"
                        className="text-grayInactive text-lg font-normal"
                      />
                    </SelectTrigger>
                    <SelectContent className="text-grayInactive text-lg font-normal">
                      {categories?.map((category, _i) => (
                        <SelectItem
                          key={_i}
                          className="rounded-xl"
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.category?.message}
                  </div>
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
            <div>
              <Product
                fileName={fileName}
                onFileNameChange={handleFileNameChange}
              />
            </div>

            <Button
              type="submit"
              className="bg-blue-600 text-white"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
      <AddMenu  opened={opened} close={close} fetchCategory={fetchCategory}/>
    </div>
  );
};

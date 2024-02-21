"use client";
import React, { useRef, useState } from "react";
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

export const MenuUpload = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileNameChange = (newFileName: string | null) => {
    setFileName(newFileName);
  };

  console.log("Selected file", fileName);
 
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
    image: z.string().default(fileName || ""),
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
      image: "",
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
                      {[
                        { label: "Jollof rice", value: "Jollof rice" },
                        { label: "Fried rice", value: "Fried rice" },
                        { label: "okro", value: "okro" },
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

            <Button type="submit" className="bg-blue-600 text-white">
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

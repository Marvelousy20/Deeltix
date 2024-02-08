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
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { Text, Image, SimpleGrid } from "@mantine/core";
export const MenuUpload = () => {
  const [file, setFile] = useState<FileWithPath[]>([]);
  const openRef = useRef(null);
  const previews = file.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    reset();
  };
  return (
    <section>
      <div className="border border-grayBottom rounded-[24px] p-[64px] w-fit">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3 className="text-xl font-bold text-grayBlack2 pb-8">
              Restaurant Overview
            </h3>
            {/* name */}
            <div className="">
              <label className="text-grayHelp text-lg font-medium">Name</label>
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
              <label className="text-grayHelp text-lg font-medium">Price</label>
              <Input
                placeholder="eg. Fried rice"
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

          {/* drop zon  request file upload */}
          <div>
            <div className="flex flex-col gap-2">
              <p className=" font-medium leading-[22.4px] text-[14px] text-bms-grey-800">
                Invoice
              </p>
              {/* <div className="flex items-center flex-wrap gap-3">
                {uploadedFiles?.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2 items-center">
                    <img
                      className="w-10 h-10 object-cover"
                      src="/file-image.jpg"
                      alt="uploaded file"
                    />
                    {item}
                  </div>
                ))}
              </div> */}

              <Dropzone
                radius="lg"
                maxSize={4 * 1024 ** 2}
                accept={[MIME_TYPES.pdf, MIME_TYPES.jpeg, MIME_TYPES.png]}
                styles={{
                  root: {
                    "&:hover": {
                      background: "#FEF9F9",
                    },
                  },
                }}
                onDrop={(files: any) => setFile(files)}
                openRef={openRef}
              >
                {file.length ? (
                  <div className="flex items-center flex-wrap gap-3">
                    {file.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-center"
                      >
                        <img
                          className="w-10 h-10 object-cover"
                          src={item?.type}
                          alt="uploaded file"
                        />

                        {/* <SimpleGrid
                          cols={4}
                          breakpoints={[{ maxWidth: "sm", cols: 2 }]}
                          mt={previews.length > 0 ? "xl" : 0}
                        >
                          {previews}
                        </SimpleGrid>
                        {item?.name} */}
                      </div>
                    ))}
                    <SimpleGrid
                      cols={4}
                      breakpoints={[{ maxWidth: "sm", cols: 2 }]}
                      mt={previews.length > 0 ? "xl" : 0}
                    >
                      {previews}
                    </SimpleGrid>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col items-center justify-center py-6">
                      <img src="/dashboard-images/dropzone-image.svg" alt="" />
                      <h3 className="text-xs font-bold text-[#242428]">
                        Drag file here
                      </h3>
                      <p className="text-center text-[#81848F] text-[12px]">
                        or{" "}
                        <span className="text-bms-red-600">
                          click to browse
                        </span>{" "}
                        (4MB) Max
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>
          <Button type="submit" className="bg-blue-600 text-white">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

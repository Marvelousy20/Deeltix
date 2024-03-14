"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, auth } from "@/axios-config";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { useState } from "react";
import { Loader } from "@mantine/core";
import { IUpdateUserProfile } from "@/types";

export const EditUserProfile = () => {
  const [isTyping, setIsTyping] = useState(false);

  const editProfileSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),

    phoneNumber: z.string().min(11, {
      message: "Phone number must be 11 digit",
    }),
    dob: z.string().min(8, {
      message: "DOB must not be less than 8 digit",
    }),
  });

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof editProfileSchema>
  >({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      dob: "",
      phoneNumber: "",
    },
  });

  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IUpdateUserProfile) =>
      await auth.patch(`/api/user/profile`, data),
    mutationKey: ["user-update"],
    onSuccess() {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries([""]);
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof editProfileSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col w-full h-full lg:pt-[56px] pt-6 bg-white">
      <section className="w-[90%] mx-auto">
        <h3 className=" text-4xl font-medium text-start pb-8 text-dark2">
          Personal Details
        </h3>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-10 border border-grayoutline rounded-[32px] p-8"
          >
            <div className="lg:flex w-full items-start space-y-8 lg:space-y-0 lg:justify-between">
              <div className="flex flex-col lg:gap-10 gap-8">
                <div className="">
                  <label className="text-grayHelp text-lg font-medium">
                    Full name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    className="text-grayInactive lg:min-w-[27rem] w-full text-lg font-normal mt-2"
                    {...register("name", {
                      onChange: () => setIsTyping(true),
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
                    Phone number
                  </label>
                  <Input
                    placeholder="Enter your phone number"
                    type="number"
                    className="text-grayInactive lg:min-w-[27rem] w-full text-lg font-normal mt-2"
                    {...register("phoneNumber", {
                      onChange: () => setIsTyping(true),
                    })}
                  />
                  {errors.phoneNumber && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors?.phoneNumber?.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:gap-10 gap-8 ">
                <div className="flex flex-col">
                  <label className="text-grayHelp text-lg font-medium">
                    DOB
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    className="text-grayInactive lg:min-w-[27rem] w-full text-lg font-normal mt-2"
                    {...register("dob", {
                      onChange: () => setIsTyping(true),
                    })}
                  />
                  {errors.dob && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.dob?.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !isTyping}
              variant="primary"
              className=" !py-5 !px-12 rounded-[40px] w-fit text-xl font-bold text-[#D8D8D8]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Saving changes
                  <span>
                    <Loader size="sm" className="opacity-70" />
                  </span>
                </div>
              ) : (
                <span>Save changes</span>
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

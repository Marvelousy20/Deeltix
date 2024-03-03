"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeSlash } from "iconsax-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { IPasswordUpdate } from "@/types";

const formSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message:
        "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
    }),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const RestaurantPassword = () => {
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");

  //  const [neweyeopen, setNewEyeOpen] = useState(false);
  // const [newtype, setNewType] = useState("password");

  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IPasswordUpdate) =>
      await api.patch(
        `/api/restaurant-manager/change-password
`,
        data
      ),
    mutationKey: ["password-update"],
    onSuccess() {
      toast.success("Password updated successfully");
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    reset();
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="border border-grayBottom rounded-[24px] p-12 w-fit hide">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex item-center justify-between pb-5">
            <h3 className="text-xl font-bold text-grayBlack2">Password</h3>
            <Button
              type="submit"
              className="w-fit !h-0 !py-4 !px-4 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <p>Saving</p>
                  <Loader size="sm" />
                </div>
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-6">
              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Old password
                </label>

                {/* input */}
                <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="w-[300px] h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("oldPassword")}
                  />

                  {eyeopen ? (
                    <Eye
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleClose}
                    />
                  ) : (
                    <EyeSlash
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleOpen}
                    />
                  )}
                </div>

                {errors.oldPassword && (
                  <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                    {errors.oldPassword?.message}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  New password
                </label>

                {/* input */}
                <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="w-[300px] h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("newPassword")}
                  />

                  {eyeopen ? (
                    <Eye
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleClose}
                    />
                  ) : (
                    <EyeSlash
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleOpen}
                    />
                  )}
                </div>

                {errors.newPassword && (
                  <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                    {errors.newPassword?.message}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Confirm password
                </label>

                {/* input */}
                <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="w-[300px] h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("confirmPassword")}
                  />

                  {eyeopen ? (
                    <Eye
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleClose}
                    />
                  ) : (
                    <EyeSlash
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleOpen}
                    />
                  )}
                </div>

                {errors.confirmPassword && (
                  <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                    {errors.confirmPassword?.message}
                  </div>
                )}
              </div>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
};

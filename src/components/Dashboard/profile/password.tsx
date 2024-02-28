"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "../../ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeSlash } from "iconsax-react";

const formSchema = z.object({
  password: z.string().min(8, {
    message:
      "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
  }),

  newPassword: z.string().min(8, {
    message:
      "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
  }),
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
      password: "",
      newPassword: "",
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
            <h3 className="text-xl font-bold text-grayBlack2">Password</h3>
            <Button
              type="submit"
              className="w-fit px-4 py-2 bg-[#574DFF] text-white text-base font-medium rounded-lg border border-[#574DFF]"
            >
              Save
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
                    {...register("password")}
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

                {errors.password && (
                  <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                    {errors.password?.message}
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
          </section>
        </form>
      </section>
    </div>
  );
};

"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api, auth } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Button } from "@/components/ui/button";
import { Loader } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AddGuest } from "@/types";
import { useUser } from "@/context/restaurant/user";
export const AddNewGuest = ({
  addguest,
  setAddGuest,
}: {
  addguest: boolean;
  setAddGuest: (open: boolean) => void;
}) => {
  const formSchema = z.object({
    fullName: z.string().min(4, {
      message: "Enter your full name",
    }),
    phoneNumber: z.string().min(11, {
      message: "Enter your phone number",
    }),
    email: z.string().email({
      message: "Enter your email address",
    }),
  });

  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
    },
  });
  const { errors } = formState;
  const { restaurantId } = useUser();
  const query = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: AddGuest) => {
      await api.post(`/api/restaurants/${restaurantId}/guest`, data);
    },
    mutationKey: ["forgot-password"],

    onSuccess() {
      toast.success("Guest added successfully");
      query.invalidateQueries(["guestbook"]);
      setAddGuest(false);
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <section>
      <Dialog open={addguest} onOpenChange={setAddGuest}>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Full name
              </label>
              <Input
                placeholder="Enter your full name"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("fullName")}
              />
              {errors.fullName && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.fullName?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Phone number
              </label>
              <Input
                placeholder="Enter your phone number"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.phoneNumber?.message}
                </div>
              )}
            </div>

            <div className="">
              <label className="text-grayHelp text-lg font-medium">
                Email address
              </label>
              <Input
                placeholder="Enter your email address"
                type="email"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("email")}
              />
              {errors.email && (
                <div className="text-red-500 text-sm font-normal pt-3">
                  {errors.email?.message}
                </div>
              )}
            </div>
            <Button type="submit" className=" w-[300px]" variant="primary">
              {isLoading ? (
                <span className="flex items-center gap-1 text-white font-medium text-xl">
                  <span>Adding guest</span> <Loader size="sm" />
                </span>
              ) : (
                <span className="text-white font-medium text-xl">
                  Add guest
                </span>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { api } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function CreateReservations() {
  const reservationSchema = z.object({
    date: z.string().min(8, {
      message: "Enter date",
    }),
    time: z.string().min(10, {
      message: "Enter food description",
    }),
    guests: z.string().min(2, {
      message: "Enter food category",
    }),

    name: z.string().min(2, {
      message: "Enter your full name",
    }),
    email: z.string().email().min(5, {
      message: "Enter your email address",
    }),
    phoneNumber: z.string().regex(/^\d{10}$/),
    specialRequests: z.string().optional(),
  });

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof reservationSchema>
  >({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <section className="flex flex-col items-center mt-10">
      <form action="">
        <h3 className="text-xl font-bold text-grayBlack2 pb-8">
          Make a reservation
        </h3>

        <div>
          <label htmlFor="date" className="text-grayHelp text-lg font-medium">
            Date
          </label>
          <Input
            placeholder="eg. Fried rice"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("date")}
          />
        </div>
      </form>
    </section>
  );
}

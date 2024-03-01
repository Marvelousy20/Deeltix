"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { useForm } from "react-hook-form";
import { useUser } from "@/context/user";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";

export default function CreateReservations() {
  const { restaurantId } = useUser();
  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await api.post(`/api/reservations/${restaurantId}/new`),

    mutationKey: ["new-reservation", "book-reservation"],
    onSuccess() {
      toast.success("Reservation created successfully");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const reservationSchema = z.object({
    // date: z.string().min(8, {
    //   message: "Enter date",
    // }),
    time: z.string().min(1, {
      message: "Select availability time",
    }),
    guests: z.string().min(1, {
      message: "Select number of guests",
    }),

    name: z.string().min(2, {
      message: "Enter your full name",
    }),
    emailAddress: z.string().email().min(5, {
      message: "Enter your email address",
    }),
    phoneNumber: z.string().regex(/^\d{11}$/),

    specialRequests: z.string().optional(),
  });

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof reservationSchema>
  >({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      time: "",
      guests: "",
      emailAddress: "",
      phoneNumber: "",
      specialRequests: "",
    },
  });
  const [date, setDate] = useState<Date>();
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof reservationSchema>) => {
    mutate({ ...values, date });
    // console.log({ ...values, date });
    reset();
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h3 className="text-xl font-bold text-grayBlack2 pt-8">
          Make a reservation
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-grayHelp text-lg font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-grayHelp text-lg font-medium">Time</label>

          <Select
            onValueChange={(value) =>
              setValue("time", value, {
                shouldValidate: true,
              })
            }
            defaultValue={watch().time}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select availability time"
                className="text-grayInactive text-lg font-normal"
              />
            </SelectTrigger>
            <SelectContent className="text-grayInactive text-lg font-normal">
              {[
                { label: "2:00pm", value: "2:00pm" },
                { label: "3:00pm", value: "3:00pm" },
                { label: "4:00pm", value: "4:00pm" },
              ].map((state, _i) => (
                <SelectItem key={_i} className="rounded-xl" value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-red-500 text-sm font-normal pt-1">
            {errors.time?.message}
          </div>
        </div>
        {/* guest */}
        <div>
          <label className="text-grayHelp text-lg font-medium">Guests</label>

          <Select
            onValueChange={(value) =>
              setValue("guests", value, {
                shouldValidate: true,
              })
            }
            defaultValue={watch().guests}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select number of guests"
                className="text-grayInactive text-lg font-normal"
              />
            </SelectTrigger>
            <SelectContent className="text-grayInactive text-lg font-normal">
              {[
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
              ].map((state, _i) => (
                <SelectItem key={_i} className="rounded-xl" value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-red-500 text-sm font-normal pt-1">
            {errors.guests?.message}
          </div>
        </div>

        {/* fullname */}

        <div>
          <label className="text-grayHelp text-lg font-medium">Full name</label>
          <Input
            placeholder="Enter your name"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("name", {
              required: true,
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
            Restaurant email address
          </label>
          <Input
            type="email"
            placeholder="cilantro@gmail.com"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("emailAddress")}
          />
          {errors.emailAddress && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.emailAddress?.message}
            </div>
          )}
        </div>

        <div>
          <label className="text-grayHelp text-lg font-medium">
            Phone number
          </label>
          <Input
            placeholder="cilantro@gmail.com"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("phoneNumber", {
              required: true,
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.phoneNumber?.message}
            </div>
          )}
        </div>

        <div>
          <label className="text-grayHelp text-lg font-medium">
            Special requests (optional)
          </label>
          <Input
            placeholder="cilantro@gmail.com"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("specialRequests", {
              required: true,
            })}
          />
          {errors.specialRequests && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.specialRequests?.message}
            </div>
          )}
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className=" w-[300px]"
          variant="primary"
        >
          {isLoading ? (
            <span className="flex items-center gap-1 text-white font-medium text-xl">
              <span>Creating reservation</span> <Loader size="sm" />
            </span>
          ) : (
            <span className="text-white font-medium text-xl">
              Create reservation
            </span>
          )}
        </Button>
      </form>
    </section>
  );
}

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
import { date, z } from "zod";
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
import dayjs from "dayjs";
import { IRestaurantReservation } from "@/types";
export default function CreateReservations() {
  const { restaurantId } = useUser();

  const reservationSchema = z.object({
    numberOfPeople: z.string().min(1, {
      message: "Enter number of guests",
    }),

    email: z.string().email().min(5, {
      message: "Enter your email address",
    }),

    specialRequest: z.string().optional(),
  });

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof reservationSchema>
  >({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      numberOfPeople: "",
      email: "",
      specialRequest: "",
    },
  });
  const [userdate, setUserDate] = useState<Date>();
  const [timer, setTimer] = useState("");
  const [timeinitial, setTimeInitial] = useState("am");
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IRestaurantReservation) =>
      await api.post(`/api/reservations/${restaurantId}/new`, data),

    mutationKey: ["new-reservation", "book-reservation"],
    onSuccess() {
      toast.success("Reservation created successfully");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof reservationSchema>) => {
    const date = dayjs(userdate).format("YYYY-MM-DD");
    const time = `${timer} ${timeinitial}`;
    console.log({ ...values, date, time });
    mutate({ ...values, date, time });
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
                {userdate ? format(userdate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dayjs(userdate).format("DD MM YYYY") as any}
                onSelect={setUserDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col">
          <label className="text-grayHelp text-lg font-medium">Time</label>
          <div className="flex items-center mt-2 h-12 rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
            <input
              required
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              type="time"
              className="h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
            />

            <select
              required
              value={timeinitial}
              onChange={(e) => setTimeInitial(e.target.value)}
              name=""
              id=""
              className=" p-2 focus-within:none focus:none outline-none"
            >
              <option value="am">am</option>
              <option value="pm">pm</option>
            </select>
          </div>
          {/* <Select
            
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
                { label: "am", value: "am" },
                { label: "pm", value: "pm" },
              ].map((state, _i) => (
                <SelectItem key={_i} className="rounded-xl" value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          {/* <div className="text-red-500 text-sm font-normal pt-1">
            {errors.time?.message}
          </div> */}
        </div>
        {/* guest */}

        <div className="">
          <label className="text-grayHelp text-lg font-medium">Guest</label>
          <Input
            placeholder="Enter number of guest"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("numberOfPeople")}
          />
          {errors.numberOfPeople && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.numberOfPeople?.message}
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
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.email?.message}
            </div>
          )}
        </div>

        {/* <div>
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
        </div> */}

        <div>
          <label className="text-grayHelp text-lg font-medium">
            Special request (optional)
          </label>
          <Input
            placeholder="cilantro@gmail.com"
            className="text-grayInactive text-lg font-normal mt-2"
            {...register("specialRequest", {
              required: true,
            })}
          />
          {errors.specialRequest && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.specialRequest?.message}
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
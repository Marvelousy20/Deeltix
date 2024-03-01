"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  label,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../DatePicker";
import Link from "next/link";
import Modal from "../ui/Modal";
import CompleteReservationAlert from "./EmailAlertModal";
import React from "react";
import ConfirmationModal from "./ConfirmBookingModal";
import EmailModal from "./EmailAlertModal";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Full name must be at least 10 characters.",
  }),

  dob: z.date({
    required_error: "A date of birth is required.",
  }),

  promo: z.string().min(2, {
    message: "You need to enter a promo code.",
  }),

  request: z.string().min(2, {
    message: "Enter your special request.",
  }),
  email: z.string().min(2, {
    message: "Enter your email address.",
  }),
  phone: z.string().min(2, {
    message: "Enter your phone number.",
  }),

  guest: z.string().min(1, {
    message: "Enter your number of guest",
  }),
});

// handle submit
function onSubmit(values: z.infer<typeof formSchema>) {
  // ✅ This will be type-safe and validated.
  console.log(values);
}

export default function Reservation() {
  const [complete, setComplete] = React.useState(false);
  const testForm = true;

  const proceed = () => {
    if (testForm) {
      setComplete(true);
    }
  };
  // define your form here
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      guest: "",
      email: "",
      phone: "",
      request: "",
      promo: "",
      dob: new Date(),
    },
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-[2rem] font-bold">Make a reservation</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Date picker */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <label className="text-grayHelp text-lg font-medium">
                  Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[300px] rounded-2xl pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* time picker */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <label className="text-grayHelp text-lg font-medium">
                  Time
                </label>
                <FormControl>
                  <Input
                    type="time"
                    placeholder="Select time"
                    {...field}
                    className="text-grayInactive text-lg font-normal"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Input Select */}
          <FormField
            control={form.control}
            name="guest"
            render={({ field }) => (
              <FormItem>
                <label className="text-grayHelp text-lg font-medium">
                  Number of people
                </label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select number of people"
                        className="text-grayInactive text-lg font-normal"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-grayInactive text-lg font-normal">
                    <SelectItem className="rounded-xl" value="s">
                      3
                    </SelectItem>
                    <SelectItem className="rounded-xl" value="m@google.com">
                      5
                    </SelectItem>
                    <SelectItem className="rounded-xl" value="m@support.com">
                      7
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* special request */}
          <FormField
            control={form.control}
            name="request"
            render={({ field }) => (
              <FormItem>
                <label className="text-grayHelp text-lg font-medium">
                  Special request (optional)
                </label>
                <FormControl>
                  <Input
                    placeholder="e.g a Table next to a window"
                    {...field}
                    className="text-grayInactive text-lg font-normal"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* promo code */}

          <FormField
            control={form.control}
            name="promo"
            render={({ field }) => (
              <FormItem>
                <label className="text-grayHelp text-lg font-medium">
                  Promo code (optional)
                </label>
                <FormControl>
                  <Input
                    placeholder="e.g welcome023"
                    {...field}
                    className="text-grayInactive text-lg font-normal"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={proceed}
            type="submit"
            className="bg-[#F0F3F8] py-2 rounded-[40px] text-xl font-bold text-[#D8D8D8] w-[300px]"
          >
            Proceed
          </Button>
        </form>
      </Form>
      {complete && (
        <Modal onClose={() => setComplete(false)}>
          {/* <EmailModal /> */}
          <ConfirmationModal />
        </Modal>
      )}
    </div>
  );
}

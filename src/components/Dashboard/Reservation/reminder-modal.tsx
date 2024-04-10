"use client";
import React, { useState } from "react";
import { Loader, Modal } from "@mantine/core";
import { UserRound, Wine } from "lucide-react";
import { useUser } from "@/context/restaurant/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// dialog
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const ReminderNotification = ({
  reservationId,
  user,
  email,
  number,
  date,
  time,
  guest,
  request,
}: {
  reservationId: string;
  user: string;
  email: string;
  number: string;
  date: string;
  time: string;
  guest: number;
  request: string;
}) => {
  const { restaurantId } = useUser();
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);
  const formSchema = z.object({
    note: z.string().min(0, {
      message: "Enter user reminder note",
    }),
  });

  const { handleSubmit, reset, register, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      await api.post(
        `/api/reservations/${restaurantId}/${reservationId}/reminder
`,
        data
      ),
    mutationKey: ["send-reminder", "reminder"],
    onSuccess() {
      toast.success("Reminder sent successfully");
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
    <div>
      <Dialog>
        <DialogTrigger>Send reminder</DialogTrigger>
        <DialogContent className=" overflow-y-scroll h-[50vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex items-center justify-center py-4"
          >
            <div className="flex flex-col gap-4 w-full z-[999]">
              <section>
                <div className="flex items-center gap-2 pb-5">
                  <UserRound color="#565D62" size={24} />
                  <h1 className=" font-medium text-[#636C71] text-xl">
                    Customer details
                  </h1>
                </div>

                <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
                  <article className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Full name
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {user}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Email address
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {email}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Phone number
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {number}
                      </h4>
                    </div>
                  </article>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 py-5">
                  <Wine size={24} />
                  <h1 className=" font-medium text-[#636C71] text-xl">
                    Reservation details
                  </h1>
                </div>

                <div className="bg-[#F9FAFB] rounded-3xl p-8 border border-[#F9FAFB]">
                  <article className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Date
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {date}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Time
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {time}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Guests
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {guest}
                      </h4>
                    </div>

                    <div className="flex items-start justify-between">
                      <h4 className="flex gap-4 font-medium text-base text-[#636C71]">
                        Special requests
                      </h4>
                      <h4 className="flex flex-col gap-4 font-medium text-base text-[#2C2929]">
                        {request}
                      </h4>
                    </div>
                  </article>
                </div>
              </section>

              <div className="pt-4 w-full lg:min-w-[27rem]">
                <label className="text-grayHelp text-lg font-medium">
                  Add note
                </label>
                <Textarea
                  {...register("note")}
                  placeholder="Your reservation date is getting near"
                  className="text-grayInactive text-lg font-normal mt-2 lg:min-w-[27rem] w-full"
                />

                {errors.note && (
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.note?.message}
                  </div>
                )}
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="w-full text-white mt-8"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <p>Sending</p>
                    <span>
                      <Loader size="sm" className="opacity-70" />
                    </span>
                  </div>
                ) : (
                  <p>Send</p>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

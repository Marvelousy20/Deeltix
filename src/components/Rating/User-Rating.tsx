import Image from "next/image";
import { Star } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { label } from "../ui/form";
import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Rating } from "@/types";
import { Loader } from "@mantine/core";

export default function UserRating({
  restaurantId,
}: {
  restaurantId: string | null | string[];
}) {
  const [rating, setRating] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const query = useQueryClient();
  const formSchema = z.object({
    feedback: z.string().min(0, {
      message: "Leave a review",
    }),
  });

  const { handleSubmit, reset, register, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const { errors } = formState;
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: Rating) =>
      await auth.post(`/api/restaurants/${restaurantId}/review`, data),
    mutationKey: ["rating"],
    onSuccess() {
      toast.success("Review made successfully");
      query.invalidateQueries(["user-review"]);
      setRating(0);
      reset();
    },
    onError(error) {
      toast.error("Review this restaurant? Sign in first");
      // handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ ...values, rating });
  };

  return (
    <section className="w-full md:w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 border rounded-[1.25rem]  lg:p-6 p-4"
      >
        <div className="flex flex-col justify-between items-center md:flex-row">
          {/* Profile part */}
          <div className="flex items-center justify-between w-full">
            <h3 className=" font-medium text-base text-[#565D62]">
              Tap to rate:
            </h3>

            <div className="flex gap-x-1 mt-4 bg-[#FFFBE5] w-fit p-3 rounded-sm">
              {[...Array(5)].map((star, idx) => {
                const ratingValue = idx + 1;
                return (
                  <div key={idx}>
                    <Star
                      size={16}
                      stroke="#D4B200"
                      fill={rating > idx ? "#D4B200" : "white"}
                      onClick={() => {
                        setRating(idx + 1);
                      }}
                      className={`cursor-pointer`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* rating part */}
        </div>

        {/* commment */}
        <div className="pt-4 w-full lg:min-w-[27rem]">
          <label className="text-grayHelp text-lg font-medium">
            Write a review
          </label>
          <Textarea
            {...register("feedback", {
              onChange: () => setIsTyping(true),
            })}
            placeholder="Please enter a review here..."
            className="text-grayInactive text-lg font-normal mt-2 lg:min-w-[27rem] w-full"
          />

          {errors.feedback && (
            <div className="text-red-500 text-sm font-normal pt-1">
              {errors.feedback?.message}
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
      </form>
    </section>
  );
}

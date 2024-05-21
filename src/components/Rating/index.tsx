import Image from "next/image";
import { Flag, Star, ThumbsUp } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { ReviewDetails } from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";

const review = [
  {
    name: "Ademola Adeniyi",
    initial: "A",
    date: "12th January, 2023",
    time: "19:00",
    content: "I love the aesthetics!",
  },
  {
    name: "Ademola Adeniyi",
    initial: "A",
    date: "12th January, 2023",
    time: "19:00",
    content: "I love the aesthetics!",
  },
];

export default function Rating({
  restaurantId,
}: {
  restaurantId: string | null | string[];
}) {
  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<ReviewDetails>(
        `/api/restaurants/${restaurantId}/reviews/all`
      ),
    queryKey: ["user-review"],
    select: ({ data }) => data?.data?.data?.reviews,
  });

  // Request to know if a user has liked a review or not
  const confirmation = async (reviewId: string) => {
    try {
      const response = await auth.get(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}/like/status`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching", error);
      throw error;
    }
  };

  // const { data: likeConfirmation } = useQuery({
  //   queryFn: async () => await confirmation(),
  //   await auth.get(
  //     `/api/restaurants/${restaurantId}/reviews/${reviewId}/like/status`
  //   ),
  //   queryKey: ["confirmation"],
  // });

  // Request for like and unlike
  const [liked, setIsliked] = useState<Boolean>(false);
  const { mutate, isLoading: likeLoading } = useMutation({
    mutationFn: async (reviewId: string) =>
      await auth.patch(
        `/api/restaurants/${restaurantId}/reviews/${reviewId}/like`
      ),
    mutationKey: ["like-review"],
    onSuccess() {
      toast.success("You liked this review");
      setIsliked(true);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  return (
    <section className="w-full md:w-full">
      {data?.map((review, idx) => (
        <div key={idx} className="mt-8 border rounded-[1.25rem]  lg:p-6 p-4">
          <div className="flex flex-row justify-between items-center md:flex-row">
            {/* Profile part */}
            <div className="flex lg:items-center item-start gap-4">
              <div className="lg:h-12 lg:w-12 h-12 w-12 rounded-full bg-background flex justify-center items-center text-[1.5rem]">
                {review?.user?.profile?.name.slice(0, 1)}
              </div>
              <div className="">
                <h1 className="text-[1.375rem] font-medium">
                  {review?.user?.profile?.name}
                </h1>
                <div className="lg:flex lg:items-center gap-1">
                  <span>{dayjs(review?.createdAt).format("DD-MM-YYYY")}</span>
                  {/* <div className="h-1 w-1 rounded-full bg-black"></div> */}
                  {/* <span>{item.time}</span> */}
                </div>
              </div>
            </div>

            {/* rating part */}
            <div className="flex gap-x-1 mt-4 bg-[#FFFBE5] w-fit p-3 rounded-sm">
              {[...Array(review?.rating)].map((item, idx) => (
                <Star key={idx} size={16} fill="#D4B200" stroke="#D4B200" />
              ))}
            </div>
          </div>

          {/* commment */}
          <div className="pt-4">
            <p className=" text-comment text-lg">{review?.feedback}</p>

            <hr className="mt-6 mb-5" />

            <div className="flex gap-10">
              <div className="flex items-center gap-2 border-r pr-6">
                <ThumbsUp
                  onClick={() => {
                    // confirmation(review?.id);
                    mutate(review?.id);
                  }}
                  className={`${
                    liked ? "text-blue-500" : "white"
                  } cursor-pointer`}
                />
                <span className={`${liked ? "text-blue-500" : "white"}`}>
                  Like
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Flag />
                <span>Report</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

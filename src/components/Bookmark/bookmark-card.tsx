import React from "react";

import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Bookmark, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { BookmarkDetails } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";

export const BookmarkCard = () => {
  const query = useQueryClient();
  const router = useRouter();
  function handleShowDetail(restaurantName: string, restaurantId: string) {
    router.push(`/${restaurantName}?restaurant=${restaurantId}`);
  }

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await auth.get<BookmarkDetails>(`/api/restaurants/bookmarks/all`),
    queryKey: ["all-bookmark"],
    select: ({ data }) => data?.data?.data?.bookmarks,
  });

  const { mutate, isLoading: bookmarkLoading } = useMutation({
    mutationFn: async (bookmarkId: string) =>
      auth.delete(`/api/restaurants/bookmarks/${bookmarkId}`),
    mutationKey: ["delete-bookmark"],
    onSuccess() {
      toast.success("Bookmark deleted successfully");
      query.invalidateQueries(["all-bookmark"]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {data?.map((d, idx) => (
        <div key={idx} className="p-1">
          <Card className=" w-full">
            <CardContent>
              <div className="relative">
                <figure className="h-[200px] w-full">
                  <Image
                    src={d?.restaurant?.displayPicture as string}
                    alt={d?.restaurant?.name}
                    width={130}
                    height={130}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center bg-grayoutline absolute top-3 right-3">
                  <Bookmark
                    size={20}
                    color="#FF0000"
                    className="cursor-pointer"
                    onClick={() => mutate(d?.id)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-4 w-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-medium">
                      {d?.restaurant?.name}
                    </h3>
                    <h6>
                      Avg Price: &#8358;
                      {formatPrice(d?.restaurant?.averagePrice)}
                    </h6>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <p className="text-sm whitespace-nowrap">
                        {d?.restaurant?.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star size={16} fill="#D4B200" stroke="#D4B200" />

                      <p>{d?.restaurant?.averageRating}.0</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="card"
                className="mt-5"
                onClick={() =>
                  handleShowDetail(d?.restaurant?.name, d?.restaurant?.id)
                }
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

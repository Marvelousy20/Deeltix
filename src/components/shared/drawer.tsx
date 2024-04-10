import { api } from "@/axios-config";
import { ErrorType, handleError } from "@/lib/handle-error";
import { NotificationDetails } from "@/types";
import { Drawer } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Reserve } from "iconsax-react";
import { Dot } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

export const NotificationDrawer = ({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) => {
  const userDetails = [
    {
      name: "New Reservation VFGH123",
      time: "1 minute ago",
      reservation: "Reservation",
      icon: <Reserve color="#565D62" />,
      route: "/profile",
    },
    {
      name: "New Reservation VFGH123",
      time: "1 minute ago",
      reservation: "Reservation",
      icon: <Reserve color="#565D62" />,
      route: "/orders",
    },
    {
      name: "New Reservation VFGH123",
      time: "1 minute ago",
      reservation: "Reservation",
      icon: <Reserve color="#565D62" />,
      route: "/reservations",
    },
    {
      name: "New Reservation VFGH123",
      time: "1 minute ago",
      reservation: "Reservation",
      icon: <Reserve color="#565D62" />,
      route: "/bookmarks",
    },
  ];

  const { data, isLoading } = useQuery({
    queryFn: async () =>
      await api.get<NotificationDetails>(
        `/api/restaurant-manager/notifications`
      ),
    queryKey: ["restaurant-notification"],
    select: ({ data }) => data?.data?.data?.notifications,
  });

  // Mark all as read
  const { mutate, isLoading: readLoading } = useMutation({
    mutationFn: async (notificationId: string) =>
      await api.patch<NotificationDetails>(
        `/api/restaurant-manager/notifications/read/${notificationId}
`
      ),
    mutationKey: ["read-notification"],
    onSuccess() {
      toast.success("You just mark as read!");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  return (
    <Drawer
      position="right"
      withCloseButton={false}
      opened={opened}
      onClose={close}
      size="xs"
      //   overlayProps={{ opacity: 0.5, blur: 4 }}
      styles={{
        root: {
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
        },
        body: {
          height: "100%",
          overflow: "auto",
        },
      }}
    >
      <div className=" flex flex-col gap-6 p-5">
        {data?.map((items, idx) => (
          <section key={idx} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-[#2C2929]">
                Notifications
              </h3>
              <p
                onClick={() => mutate(items?.id as string)}
                className="font-normal cursor-pointer text-base text-[#574DFF]"
              >
                Mark as read
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* {data?.map((items, idx) => ( */}
              <div className="flex gap-3 items-start">
                <div className="">
                  <Reserve color="#565D62" />
                </div>

                <div className="flex w-full justify-between border-b border-[#F2F4F7] pb-4">
                  <div className="flex flex-col gap-2">
                    <h3 className=" text-base font-medium text-grayBlack">
                      {items?.message}
                    </h3>
                    <section className="flex items-start gap-3">
                      <div className="flex flex-col gap-2">
                        <p className="font-normal text-sm text-grayInactive">
                          {dayjs(items?.createdAt).format("DD-MM-YYYY")}
                        </p>
                        <p className="font-normal text-sm text-grayInactive">
                          {dayjs(items?.createdAt).format("hh:mm a")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dot color="#636C71" />
                        <p className="font-normal text-sm text-grayInactive">
                          {items?.sourceType}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              {/* ))} */}
            </div>
          </section>
        ))}
      </div>
    </Drawer>
  );
};

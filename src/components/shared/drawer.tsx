import { Drawer } from "@mantine/core";
import { Reserve } from "iconsax-react";
import { Dot } from "lucide-react";
import React from "react";

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
        },
        body: {
          height: "100%",
          overflow: "auto",
        },
      }}
    >
      <div className=" flex flex-col gap-6 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl text-[#2C2929]">Notifications</h3>
          <p className="font-normal cursor-pointer text-base text-[#574DFF]">
            Mark all as read
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {userDetails.map((items, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="">{items?.icon}</div>

              <div className="flex w-full justify-between border-b border-[#F2F4F7] pb-4">
                <div className="flex flex-col gap-2">
                  <h3 className=" text-base font-medium text-grayBlack">
                    {items.name}
                  </h3>
                  <section className="flex items-center gap-3">
                    <p className="font-normal text-sm text-grayInactive">
                      {items.time}
                    </p>
                    <div className="flex items-center gap-1">
                      <Dot color="#636C71" />
                      <p className="font-normal text-sm text-grayInactive">
                        {items.reservation}
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

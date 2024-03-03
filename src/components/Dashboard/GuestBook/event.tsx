import { useDisclosure } from "@mantine/hooks";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { GuestUpdate } from "./modal";

export const ModalEvent = ({
  user,
  email,
  number,
}: {
  user: string;
  email: string;
  number: string;
}) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <div>
      <MoreHorizontal onClick={open} className=" cursor-pointer" />;
      <GuestUpdate
        opened={opened}
        close={close}
        user={user}
        email={email}
        number={number}
      />
    </div>
  );
};

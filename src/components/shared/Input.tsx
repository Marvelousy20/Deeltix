import React from "react";
import { Input } from "../ui/input";

export const TextInput = ({
  placeholder,
}: //   type,
//   label,
{
  placeholder: string;
  //   type: string;
  //   label: string;
}) => {
  return (
    <Input
      placeholder={placeholder}
      className="text-grayInactive text-lg font-normal"
    />
  );
};

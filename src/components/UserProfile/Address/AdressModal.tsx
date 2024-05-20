import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { Loader, Modal } from "@mantine/core";
import { ErrorType, handleError } from "@/lib/handle-error";
import { toast } from "react-toastify";
import { IUpdateUserAddress } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/components/Dashboard/profile/state";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 10 character.",
  }),

  state: z.string().min(4, {
    message: "State must be at least 4 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 5 characters.",
  }),
});

export default function UserAddressModal({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) {
  const { handleSubmit, register, formState, reset, setValue, watch } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      country: "",
      state: "",
    },
  });
  const { errors } = formState;
  const [isTyping, setIsTyping] = useState(false);
  const query = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IUpdateUserAddress) => {
      await auth.post(`/api/user/profile/address`, data);
    },
    mutationKey: ["update-user-address"],

    onSuccess() {
      toast.success("Your address as been updated successfully");
      query.invalidateQueries(["fetch-user-address"]);
      reset();
      close();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    // console.log(values);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered title="New address">
        <div className="flex lg:w-[40%] w-full flex-col bg-white rounded-lg">
          <div className="flex flex-col">
            <div className="h-[1px] w-full bg-[#F0F3F8]"></div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col items-center py-4 justify-center space-y-4"
            >
              <div className="flex flex-col">
                <label className="flex items-center justify-between ">
                  <p className="font-bold text-lg text-grayHelp">
                    Your address
                  </p>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/location.svg"
                      width={20}
                      height={20}
                      alt="close-modal"
                    />
                    <p className="font-normal text-sm text-[#FF0000]">
                      Get current location
                    </p>
                  </div>
                </label>

                <Input
                  placeholder="Enter address"
                  className="text-grayInactive lg:min-w-[27rem] w-full text-lg font-normal mt-2"
                  {...register("address", {
                    onChange: () => setIsTyping(true),
                  })}
                />
                {errors.address && (
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.address?.message}
                  </div>
                )}
              </div>

              <section className="flex items-center">
                <div className="lg:min-w-[27rem] w-full flex flex-col justify-center">
                  <label className="text-grayHelp text-lg font-medium">
                    State
                  </label>

                  <Select
                    onValueChange={(value) =>
                      setValue("state", value, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={watch().state}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select your state"
                        className="text-grayInactive  text-lg font-normal"
                      />
                    </SelectTrigger>
                    <SelectContent className="text-grayInactive z-[9999] text-lg font-normal">
                      {states.map((state, _i) => (
                        <SelectItem
                          key={_i}
                          className="rounded-xl"
                          value={state}
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.state?.message}
                  </div>
                </div>
              </section>

              <section className="flex items-center">
                <div className="lg:min-w-[27rem] w-full">
                  <label className="text-grayHelp text-lg font-medium">
                    Country
                  </label>

                  <Select
                    onValueChange={(value) =>
                      setValue("country", value, {
                        shouldValidate: true,
                      })
                    }
                    defaultValue={watch().country}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Select your country"
                        className="text-grayInactive text-lg font-normal"
                      />
                    </SelectTrigger>
                    <SelectContent className="text- z-[9999] text-lg font-normal">
                      {/* {data?.data?.map((country: any, _i: any) => (
                    <SelectItem
                      key={_i}
                      className="rounded-xl"
                      value={country?.name?.common}
                    >
                      {country?.name?.common}
                    </SelectItem>
                  ))} */}
                      <SelectItem className="rounded-xl" value="Nigeria">
                        Nigeria
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-red-500 text-sm font-normal pt-1">
                    {errors.country?.message}
                  </div>
                </div>
              </section>

              <Button
                type="submit"
                disabled={isLoading || !isTyping}
                variant="primary"
                className=" py-2 rounded-[40px] lg:min-w-[27rem] text-xl font-bold text-[#D8D8D8]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    Saving changes
                    <span>
                      <Loader size="sm" className="opacity-70" />
                    </span>
                  </div>
                ) : (
                  <span>Save changes</span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

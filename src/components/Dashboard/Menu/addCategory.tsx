"use client";
import { Modal } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api, auth } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { IVerifyCategory } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/context/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Category } from "iconsax-react";

function AddCategory({
  opened,
  close,
  fetchCategory,
}: {
  opened: any;
  close: () => void;
  fetchCategory: any;
}) {
  const [isOpen, { open, close: handleClose }] = useDisclosure(false);
  const { restaurantId } = useUser();

  //   const { push } = useRouter();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Add category",
    }),
  });

  const { handleSubmit, register, formState, reset } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IVerifyCategory) => {
      await api.post(
        `/api/restaurants/${restaurantId}/menu/categories/new`,
        data
      );
    },
    mutationKey: ["restaurantId"],

    onSuccess() {
      toast.success("Yuppy! New category has been added");
      fetchCategory();
      close();
      open();
      reset();
      //   push("");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  //IVerifyCategory
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
    reset();
  };

  return (
    <>
      <Modal
        className="bg-blue-500 !z-[5000000]"
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="40%"
      >
        <div className="flex flex-col py-6 ">
          <div className="flex w-full bg-white rounded-lg gap-5 justify-center items-center">
            <div
              onClick={close}
              className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
            >
              {/* <MoveLeft /> */}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h1 className="text-xl font-bold mb-6">New Category</h1>
              </div>
              <div className="flex items-center gap-6">
                <div className="">
                  {/* <label className="text-grayHelp text-lg font-medium">
                  Category
                </label> */}

                  <Input
                    placeholder="e.g seafoods"
                    type="string"
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("name")}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm font-normal pt-3">
                      {errors.name?.message}
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-fit"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 text-white font-medium text-xl">
                        <span> Adding Category</span> <Loader size="sm" />
                      </span>
                    ) : (
                      <span className="text-white font-medium">
                        Add Category
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddCategory;

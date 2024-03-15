import { auth } from "@/axios-config";
import { Button } from "@/components/ui/button";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";

export const DeleteAddress = ({
  opened,
  close,
  id,
}: {
  opened: any;
  close: () => void;
  id: string;
}) => {
  const query = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async () =>
      await auth.delete(`/api/user/profile/address/${id}
`),
    mutationKey: ["delete-address"],
    onSuccess() {
      toast.success("Address deleted successfully");
      close();
      query.invalidateQueries(["fetch-user-address"]);
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        id={id}
        centered
        size="30%"
        withCloseButton={false}
      >
        <div className="h-[1px] w-full bg-[#F0F3F8] my-5"></div>

        <div className="w-fit p-8 flex items-center justify-center rounded-2xl border border-white bg-white">
          <div className="flex flex-col gap-3 items-center justify-center">
            <p className="max-w-[300px] text-center text-base text-normal text-comment ">
              Are you sure you want to proceed to delete this address?
            </p>

            <Button
              onClick={handleDelete}
              className="text-white w-full text-base font-bold bg-grayBlack2 rounded-[40px]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Deleting
                  <span>
                    <Loader size="sm" className="opacity-70" />
                  </span>
                </div>
              ) : (
                <p>Yes, proceed</p>
              )}
            </Button>

            <p
              onClick={close}
              className="text-xl font-bold text-grayBlack2 cursor-pointer"
            >
              Cancel
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

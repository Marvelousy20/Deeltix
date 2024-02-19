import React from "react";
import { MoveLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import auth from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ModalPassword from "./ui/modals/modal-password";
import { useRouter } from "next/navigation";
export default function ForgetPassword() {
  // const [opened, { open, close }] = useDisclosure(false);
  const { push } = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Enter your email address",
    }),
  });

  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ForgotPassword) => {
      await auth.post(`/api/auth/forgot-password`, data);
    },
    mutationKey: ["forgot-password"],

    onSuccess() {
      toast.success("Yuppy! Check your email for otp code");
      close;
      reset();
      push("");
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex w-full bg-white rounded-lg gap-5">
      <div className="w-1/2 p-10">
        <div
          onClick={() => close}
          className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
        >
          <MoveLeft />
          <p>Go back</p>
        </div>
        <h1 className="text-3xl font-bold pb-6">Forget password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="">
            <label className="text-grayHelp text-lg font-medium">
              Email address
            </label>
            <Input
              placeholder="Enter your email address"
              type="email"
              className="text-grayInactive text-lg font-normal mt-2"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500 text-sm font-normal pt-3">
                {errors.email?.message}
              </div>
            )}
          </div>
          <Button type="submit" className=" w-[300px]" variant="primary">
            {isLoading ? (
              <span className="flex items-center gap-1 text-white font-medium text-xl">
                <span> Resetting password</span> <Loader size="sm" />
              </span>
            ) : (
              <span className="text-white font-medium text-xl">
                Reset password
              </span>
            )}
          </Button>
        </form>
      </div>
      <div className="rounded-r-lg w-full bg-[url('/signup-rest.png')] bg-cover bg-no-repeat"></div>
      {/* <ModalPassword opened={opened} close={close} /> */}
    </div>
  );
}

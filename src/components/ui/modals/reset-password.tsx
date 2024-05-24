"use client";
import { Modal } from "@mantine/core";
import { MoveLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "@/axios-config";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword, IResetPassword } from "@/types";
import { toast } from "react-toastify";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../input";
import { Button } from "../button";
import OtpInput from "react-otp-input";
import { cookieStorage } from "@ibnlanre/portal";
import SuccessMessage from "./password-success";
import { Eye, EyeSlash } from "iconsax-react";

function ModalResetPassword({
  opened,
  close,
}: {
  opened: any;
  close: () => void;
}) {
  const [resetOpened, { open, close: resetClose }] = useDisclosure(false);
  const [otp, setOtp] = useState("");
  const [eyeopen, setEyeOpen] = useState(false);
  const [type, setType] = useState("password");

  function handleOpen() {
    setType("text");
    setEyeOpen(true);
  }

  function handleClose() {
    setType("password");
    setEyeOpen(false);
  }
  const { push } = useRouter();
  const formSchema = z
    .object({
      email: z.string().email({
        message: "Enter your email address",
      }),

      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const { handleSubmit, register, formState, reset, getValues } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IResetPassword) => {
      await auth.post(`/api/auth/reset-password`, data);
    },
    mutationKey: ["reset-password"],

    onSuccess() {
      push("/");
      reset();
      toast.success("Kindly log in your account");
      close();
      open();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const email = cookieStorage.getItem("email");
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ ...values, otp });
  };

  return (
    <>
      <Modal
        className=""
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        size="70%"
        style={{
          zIndex: "2000",
          position: "relative",
        }}
      >
        <div className="flex w-full bg-white rounded-lg gap-5">
          <div className="w-1/2 p-10">
            <div
              onClick={close}
              className="mb-6 cursor-pointer flex gap-1 text-lg text-[#565D62] items-center"
            >
              <MoveLeft />
              <p>Go back</p>
            </div>
            <h1 className="text-3xl font-bold pb-6">Forget password</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="max-w-[300px]">
                <label className="text-grayHelp w-[300px] pb-2 font-medium flex items-center justify-between">
                  <p className="font-medium text-lg text-[#565D62]">Otp</p>
                  <p className="text-base font-medium text-[#574DFF] underline underline-offset-4 cursor-pointer">
                    Resend code
                  </p>
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType="tel"
                  inputStyle="!w-[45px] h-10 bg-[#F0F3F8] rounded-[16px] text-center outline-none transition-all4 border border-[#F0F3F8] text-[32px] text-[#2C2929] font-medium"
                  containerStyle="flex items-start gap-x-2 max-w-[300px]"
                  renderInput={(props) => (
                    <input {...props} style={{ width: "3.3rem" }} />
                  )}
                />
              </div>

              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Email address
                </label>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="text-grayInactive text-lg font-normal mt-2 w-full lg:w-[27rem] rounded-2xl"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm font-normal pt-3">
                    {errors.email?.message}
                  </div>
                )}
              </div>

              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Password
                </label>
                <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="w-[300px] h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("password")}
                  />

                  {eyeopen ? (
                    <Eye
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleClose}
                    />
                  ) : (
                    <EyeSlash
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleOpen}
                    />
                  )}
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm font-normal pt-3">
                    {errors.password?.message}
                  </div>
                )}
              </div>

              <div className="">
                <label className="text-grayHelp text-lg font-medium">
                  Confirm password
                </label>
                <div className=" items-center  mt-2 justify-between flex h-12 w-[300px] rounded-2xl border border-neutral-200 bg-input py-5 text-sm  focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2">
                  <input
                    type={type}
                    placeholder="Enter your password"
                    className="w-[300px] h-12 px-3 outline-none rounded-2xl text-grayInactive text-lg font-normal rounded-r-none border-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    {...register("confirmPassword")}
                  />

                  {eyeopen ? (
                    <Eye
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleClose}
                    />
                  ) : (
                    <EyeSlash
                      size={32}
                      className=" cursor-pointer pr-3"
                      onClick={handleOpen}
                    />
                  )}
                </div>
                {errors.password && (
                  <div className="text-red-500 text-sm font-normal pt-3">
                    {errors.confirmPassword?.message}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className=" w-[300px]"
                variant="primary"
                disabled={otp === "" ? true : false}
              >
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
        </div>
      </Modal>
      <SuccessMessage opened={resetOpened} close={resetClose} />
    </>
  );
}

export default ModalResetPassword;

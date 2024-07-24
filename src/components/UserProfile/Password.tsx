import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  label,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/axios-config";
import { IPasswordUpdate } from "@/types";
import { ErrorType, handleError } from "@/lib/handle-error";
import { Eye, EyeSlash } from "iconsax-react";
import { Loader } from "@mantine/core";

const formSchema = z
  .object({
    oldPassword: z.string().min(8, {
      message:
        "Password must contain at least eight characters. It must have at least one upper case, one lower case, one number and one special character",
    }),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export default function UserPassword() {
  const [password, setPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  function handlePassword() {
    setPassword(!password);
  }

  function handleNewPassword() {
    setNewPassword(!newPassword);
  }

  function handleConfirmPassword() {
    setConfirmPassword(!confirmPassword);
  }

  const [isTyping, setIsTyping] = useState(false);

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: IPasswordUpdate) =>
      await auth.patch(
        `/api/user/change-password
`,
        data
      ),
    mutationKey: ["user-password-update"],
    onSuccess() {
      toast.success("Password updated successfully");
      reset();
    },
    onError(error) {
      handleError(error as ErrorType);
    },
  });
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col w-full h-full lg:pt-[56px] pt-6 bg-white">
      <section className="w-[90%] mx-auto">
        <h3 className=" text-4xl font-medium text-start pb-8 text-dark2">
          Password
        </h3>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-10 border border-grayoutline rounded-[32px] p-8"
          >
            <div className="lg:flex items-start justify-between">
              <div className="flex flex-col w-full gap-10">
                <div className="w-full lg:max-w-[27rem] relative">
                  <label className="text-grayHelp text-lg font-medium">
                    Old password
                  </label>
                  <Input
                    placeholder="Enter your password"
                    type={password ? "password" : "text"}
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("oldPassword", {
                      onChange: () => setIsTyping(true),
                    })}
                  />
                  {errors.oldPassword && (
                    <div className="text-red-500 text-sm font-normal pt-3">
                      {errors.oldPassword?.message}
                    </div>
                  )}
                  <span
                    onClick={handlePassword}
                    className="absolute right-0 top-[53%]"
                  >
                    {password ? (
                      <EyeSlash size={32} className=" cursor-pointer pr-3" />
                    ) : (
                      <Eye size={32} className=" cursor-pointer pr-3" />
                    )}
                  </span>
                </div>

                {/* enter password */}
                <div className="w-full lg:max-w-[27rem] relative">
                  <label className="text-grayHelp text-lg font-medium">
                    New password
                  </label>
                  <Input
                    placeholder="Enter your password"
                    type={newPassword ? "password" : "text"}
                    className="text-grayInactive text-lg font-normal mt-2"
                    {...register("newPassword", {
                      onChange: () => setIsTyping(true),
                    })}
                  />
                  {errors.newPassword && (
                    <div className="text-red-500 text-sm font-normal pt-3">
                      {errors.newPassword?.message}
                    </div>
                  )}
                  <span
                    onClick={handleNewPassword}
                    className="absolute right-0 top-[53%]"
                  >
                    {newPassword ? (
                      <EyeSlash size={32} className=" cursor-pointer pr-3" />
                    ) : (
                      <Eye size={32} className=" cursor-pointer pr-3" />
                    )}
                  </span>
                </div>
                {/* re-enter password */}
              </div>

              <div className="w-full lg:max-w-[27rem] relative mt-10 lg:mt-0">
                <label className="text-grayHelp text-lg font-medium">
                  Confirm password
                </label>
                <Input
                  placeholder="Enter your password"
                  type={confirmPassword ? "password" : "text"}
                  className="text-grayInactive text-lg font-normal mt-2"
                  {...register("confirmPassword", {
                    onChange: () => setIsTyping(true),
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 text-sm font-normal pt-3">
                    {errors.confirmPassword?.message}
                  </div>
                )}
                <span
                  onClick={handleConfirmPassword}
                  className="absolute right-0 top-[53%]"
                >
                  {confirmPassword ? (
                    <EyeSlash size={32} className=" cursor-pointer pr-3" />
                  ) : (
                    <Eye size={32} className=" cursor-pointer pr-3" />
                  )}
                </span>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !isTyping}
              variant="primary"
              className=" !py-5 !px-12 rounded-[40px] w-fit text-xl font-bold text-[#D8D8D8]"
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
      </section>
    </div>
  );
}

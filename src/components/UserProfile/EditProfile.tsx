import React from "react";
import { Button } from "../ui/button";
import InputField from "../ui/InputField";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  label,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/axios-config";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function EditUserProfile() {
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => await api.patch(``),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="flex flex-col w-full h-full lg:pt-[56px] pt-6 bg-white">
      <section className="w-[90%] mx-auto">
        <h3 className=" text-4xl font-medium text-start pb-8 text-dark2">
          Personal Details
        </h3>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-10 border border-grayoutline rounded-[32px] p-8"
            >
              <div className="lg:flex  items-start space-y-8 lg:space-y-0 lg:justify-between">
                <div className="flex flex-col lg:gap-10 gap-8">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          Full name
                        </label>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          Phone number
                        </label>
                        <FormControl>
                          <Input
                            type="phone"
                            placeholder="Enter your phone number"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col lg:gap-10 gap-8">
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          Email
                        </label>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* password */}

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          Date of birth
                        </label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>
                        <FormDescription>
                          Password must contain 8 characters long
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <p>Confirm booking</p> */}
                </div>
              </div>
              <Button
                type="submit"
                className="bg-[#F0F3F8] py-2 rounded-[40px] text-xl font-bold text-[#D8D8D8] lg:w-[300px] w-full"
              >
                Save changes
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}

import React from "react";
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

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export default function UserPassword() {
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
          Password
        </h3>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full gap-10 border border-grayoutline rounded-[32px] p-8"
            >
              <div className="lg:flex items-start justify-between">
                <div className="flex flex-col gap-10">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          Old password
                        </label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
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
                          Re-enter new password
                        </label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="password"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col pt-10">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-grayHelp text-lg font-medium">
                          New password
                        </label>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            className="text-grayInactive text-lg font-normal lg:w-[300px] w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
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

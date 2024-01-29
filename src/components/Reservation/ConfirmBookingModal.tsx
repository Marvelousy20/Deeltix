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
  FormLabel,
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

export default function ConfirmationModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="flex flex-col w-[500px] bg-white rounded-lg z-[9999]">
      <div className="w-[500px]">
        <div className=" flex gap-1 text-lg text-[#565D62] items-center justify-center w-full h-8 bg-background my-4">
          <Image src="/voltage.png" width={30} height={30} alt="Voltage" />
          <p className="font-normal text-sm text-grayBlack2">
            Please provide your details to complete your reservation
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col pb-8 items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayHelp text-lg font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="text-grayInactive text-lg font-normal"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone number */}

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-grayHelp text-lg font-medium">
                    Phone number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="phone"
                      placeholder="Enter your phone number"
                      {...field}
                      className="text-grayInactive text-lg font-normal"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-grayHelp text-lg font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="text-grayInactive text-lg font-normal"
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
            <Button
              type="submit"
              className="bg-[#F0F3F8] py-2 rounded-[40px] text-xl font-bold text-[#D8D8D8] w-[300px]"
            >
              Confirm booking
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

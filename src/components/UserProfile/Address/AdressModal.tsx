import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

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

export default function UserAddressModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });
  return (
    <div className="flex flex-col py-6 px-8 bg-white rounded-lg">
      <div className="flex flex-col space-y-4">
        <div className=" flex items-center justify-between">
          <p className="font-bold text-xl text-grayBlack">New address</p>
          <Image
            src="/close-circle.svg"
            width={25}
            height={25}
            alt="close-modal"
          />
        </div>
        <div className="h-[1px] w-full bg-[#F0F3F8]"></div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col items-center justify-center space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <label className="flex items-center justify-between">
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
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-lg text-grayHelp">
                    Landmark
                  </label>
                  <FormControl>
                    <Input placeholder="Enter landmark" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#F0F3F8] py-2 rounded-[40px] text-xl font-bold text-[#D8D8D8] w-full"
            >
              Done
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

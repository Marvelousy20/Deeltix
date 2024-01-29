// import React from "react";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "../ui/input";
// import { form, onSubmit } from "./ConfirmBookingModal";

// export default function EmailModal() {
//   return (
//     <div className="flex flex-col w-[500px] bg-white rounded-lg">
//       <div className="w-[500px]">
//         <div className=" flex gap-1 text-lg text-[#565D62] items-center justify-center w-full h-8 bg-background mt-14">
//           <Image src="/voltage.png" width={30} height={30} alt="Voltage" />
//           <p className="font-normal text-sm text-grayBlack2">
//             Please provide your email to complete your reservation
//           </p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField
//               control={form.control}
//               name="username"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Full name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="John doe" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* email */}
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-grayHelp text-lg font-medium">
//                     Email
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="email"
//                       placeholder="Enter your email address"
//                       {...field}
//                       className="text-grayInactive text-lg font-normal"
//                     />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* phone number */}

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-grayHelp text-lg font-medium">
//                     Phone number
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="phone"
//                       placeholder="Enter your phone number"
//                       {...field}
//                       className="text-grayInactive text-lg font-normal"
//                     />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* password */}
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-grayHelp text-lg font-medium">
//                     Password
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="password"
//                       placeholder="Enter your phone number"
//                       {...field}
//                       className="text-grayInactive text-lg font-normal"
//                     />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <p className="mt-3 text-sm leading-6 text-gray-600">
//               Password must contain a minimum of 8 characters
//             </p>

//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

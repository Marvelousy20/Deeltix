"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RestaurantProfile } from "./restaurant";
import { RestaurantAccount } from "./account";
import { RestaurantPassword } from "./password";
import { ProfileUpload } from "./picture-upload";
import { useUser } from "@/context/restaurant/user";
import Gallery from "./gallery";

export const ProfileTab = () => {
  const {user} = useUser()
  if (!user){
    return <div>loading</div>
  }
  return (
    <section className="max-w-lg lg:min-w-[32.5rem]">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-2xl text-[#000000]">Profile</h3>
        <p className="font-normal text-base text-grayInactive">
          Manage and update your account info{" "}
        </p>
      </div>

      <Tabs defaultValue="account" className="flex flex-col gap-10 w-full mt-8">
        <TabsList className="justify-start">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="restaurant"
            className="data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
          >
            Restaurant
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className=" data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className=" data-[state=active]:bg-[#F7F7F7]  py-3 px-5 data-[state=active]:rounded-[8px] data-[state=active]:border-none text-[#565D62] data-[state=active]:text-[#2C2929]"
          >
            Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <RestaurantAccount user={user}/>
        </TabsContent>

        <TabsContent value="restaurant">
          <ProfileUpload user={user}/>
        </TabsContent>

        <TabsContent value="password">
          <RestaurantPassword />
        </TabsContent>

        <TabsContent value="gallery">
          <Gallery user={user}/>
        </TabsContent>
      </Tabs>
    </section>
  );
};

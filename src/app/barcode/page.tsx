import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Food from "@/components/QRCode/food";
import Drinks from "@/components/QRCode/drinks";
import { MoveLeft } from "lucide-react";
import Image from "next/image";

const Barcode = () => {
  return (
    <div className="max-w-lg mx-auto px-5 pb-10">
      <div className="bg-[#1D1D1D] py-4 px-5 text-white flex items-center justify-between">
        <MoveLeft />

        <p className="text-xl font-bold">Menu items</p>

        <Image src="/qrcode/cart.svg" width={20} height={20} alt="cart" />

        <div>
          <Image src="/qrcode/logo.svg" width={32} height={32} alt="cart" />
        </div>
      </div>

      <Tabs defaultValue="food" className="mt-8">
        <div className="flex justify-center">
          <TabsList className="rounded-[30px] bg-[#F0F3F8]">
            <TabsTrigger
              value="food"
              className="rounded-[30px] data-[state=active]:bg-white data-[state=active]:border-none data-[state=active]:text-[#574DFF] data-[state=active]:font-semibold"
            >
              Food
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="rounded-[30px] data-[state=active]:bg-white data-[state=active]:border-none data-[state=active]:text-[#574DFF] data-[state=active]:font-semibold"
            >
              Drinks
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="food">
          <Food />
        </TabsContent>
        <TabsContent value="drinks">
          <Drinks />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Barcode;

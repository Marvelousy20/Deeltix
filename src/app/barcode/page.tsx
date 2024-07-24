import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import Food from "@/components/QRCode/food";
import Drinks from "@/components/QRCode/drinks";

const Barcode = () => {
  return (
    <div className="max-w-lg mx-auto px-5 pb-10">
      <Tabs defaultValue="food">
        <div className="flex justify-center">
          <TabsList className="rounded-[30px] bg-[#F0F3F8]">
            <TabsTrigger
              value="food"
              className="rounded-[30px] data-[state=active]:bg-white data-[state=active]:border-none"
            >
              Food
            </TabsTrigger>
            <TabsTrigger
              value="drinks"
              className="rounded-[30px] data-[state=active]:bg-white data-[state=active]:border-none"
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

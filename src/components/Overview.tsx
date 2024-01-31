import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Overview() {
  return (
    <div className="mt-4">
      <p className="text-grayBlack font-mdeium">
        With its gorgeous setting on Abu Dhabi’s Grand Canal, this
        Lebanese-inspired concept restaurant focuses on providing the best in
        Arabic cuisine. Contemporary, Mijana offers top-quality fare that will
        impress. Show kitchens will entertain with something for everyone on the
        menu. Plus, its location makes it a great option for shisha as the
        evening unwinds into the night...
        <span className="font-semibold">read more</span>
      </p>

      <div className="mt-6">
        <h4>Opening hours</h4>
        <p className="mt-2">
          Monday-Saturday{" "}
          <span className="font-medium ml-4">10:00 - 19:00</span>
        </p>
      </div>
      <hr className="my-10" />

      {/* <div className="grid grid-cols-6">
        <h1 className="text-3xl font-bold col-span-2">Menu</h1>
        <div className="col-span-4 w-full">
          <Input placeholder="Search store menu" className="w-full" />
        </div>
      </div> */}
    </div>
  );
}

import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Overview({
  description,
  days,
  time,
}: {
  description: string;
  days: string;
  time: string;
}) {
  return (
    <div className="mt-4">
      <p className="text-grayBlack font-mdeium">{description}</p>

      <div className="mt-6">
        <h4>Opening hours</h4>
        <p className="mt-2">
          {days}
          <span className="font-medium ml-4">{time}</span>
        </p>
      </div>
      <hr className="my-10" />
    </div>
  );
}

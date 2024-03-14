import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { IMenu } from "@/types";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface DataProps {
  data: IMenu[];
}

export default function ReservationCard({ data }: DataProps) {
  return (
    <div className="grid xl:grid-cols-3 max-w-4xl gap-6">
      {data.map((d, index) => (
        <div key={index} className="w-full">
          <div className="p-1">
            <Card>
              <CardContent>
                <div className="relative">
                  <Image src={d.img} alt={d.img} width={350} height={300} />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{d.name}</h3>

                    <h6>&#8358;{formatPrice(d.price)}</h6>
                  </div>
                  <p className="text-[#565D62]">{d.description}</p>
                </div>
                <Button variant="card" className="mt-5">
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

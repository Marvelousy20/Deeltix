import Image from "next/image";
import MenuCard from "./MenuCard";
import { Button } from "@/components/ui/button";

const Drinks = () => {
  return (
    <div className="drinks">
      <div className="w-full">
        <Image
          src="/qrcode/food.png"
          width={350}
          height={171}
          alt="food"
          className="w-full"
        />
      </div>

      <div>
        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Jollof Rice"
          price="3,380.00"
          image="/qrcode/jollof.png"
        />

        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Fried Rice"
          price="3,380.00"
          image="/qrcode/fried.png"
        />

        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Fried Rice"
          price="3,380.00"
          image="/qrcode/fried.png"
        />

        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Fried Rice"
          price="3,380.00"
          image="/qrcode/fried.png"
        />

        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Fried Rice"
          price="3,380.00"
          image="/qrcode/fried.png"
        />

        <MenuCard
          desc="Palm wine infused with orange, apple and garnished with orange slices."
          name="Fried Rice"
          price="3,380.00"
          image="/qrcode/fried.png"
        />
      </div>

      <div className="flex justify-center mt-6">
        <Button className="bg-[#574DFF] rounded-[40px] text-sm text-white font-medium">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Drinks;

import Image from "next/image";

type Props = {
  name: string;
  image: string;
  desc: string;
  price: string;
};

const MenuCard = ({ name, image, desc, price }: Props) => {
  return (
    <div className="border-[0.5px] rounded-[6px] border-[#0A0A0A33] border-opacity-20 p-1.5 w-full flex mb-4 gap-2 mt-6">
      <div className="w-1/4">
        <Image src={image} alt={name} width={92} height={92} />
      </div>

      <div className="font-medium flex flex-col justify-between w-3/4">
        <h2>{name}</h2>

        <p className="text-[0.5rem] text-[#636C71] leading-[18px] max-w-[9rem]">
          {desc}
        </p>

        <div className="flex justify-between items-center">
          <h3 className="text-[#574DFF]"> &#8358;{price}</h3>

          <div>
            <input
              type="number"
              placeholder="0"
              className="w-[69px] h-[22px] p-2 border border-[#DCDCDC] rounded-full text-[#636C71] text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

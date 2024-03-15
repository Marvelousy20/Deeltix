import Image from "next/image";
import { Star } from "lucide-react";

const review = [
  {
    name: "Ademola Adeniyi",
    initial: "A",
    date: "12th January, 2023",
    time: "19:00",
    content: "I love the aesthetics!",
  },
  {
    name: "Ademola Adeniyi",
    initial: "A",
    date: "12th January, 2023",
    time: "19:00",
    content: "I love the aesthetics!",
  },
];

export default function Rating() {
  return (
    <section className="w-fit md:w-full">
      {review.map((item) => (
        <div
          key={item.name}
          className="mt-8 border rounded-[1.25rem]  lg:p-6 p-4"
        >
          <div className="flex flex-col justify-between items-center md:flex-row">
            {/* Profile part */}
            <div className="flex items-center gap-4">
              <div className="lg:h-12 lg:w-12 h-12 w-12 rounded-full bg-background flex justify-center items-center text-[1.5rem]">
                {item?.initial}
              </div>
              <div className="">
                <h1 className="text-[1.375rem] font-medium">{item.name}</h1>
                <div className="lg:flex lg:items-center gap-1">
                  <span>{item.date}</span>
                  {/* <div className="h-1 w-1 rounded-full bg-black"></div> */}
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            {/* rating part */}
            <div className="flex gap-x-1 mt-4 bg-[#FFFBE5] w-fit p-3 rounded-sm">
              <Star size={16} fill="#D4B200" stroke="#D4B200" />
              <Star size={16} fill="#D4B200" stroke="#D4B200" />
              <Star size={16} fill="#D4B200" stroke="#D4B200" />
              <Star size={16} stroke="#D4B200" />
              <Star size={16} stroke="#D4B200" />
            </div>
          </div>

          {/* commment */}
          <div className="pt-4">
            <p className=" text-comment text-lg">{item.content}</p>

            <hr className="mt-6 mb-5" />

            <div className="flex gap-10">
              <div className="flex items-center gap-2 border-r pr-6">
                <Image src="/like.svg" alt="like" width={32} height={32} />
                <span>Like</span>
              </div>

              <div className="flex items-center gap-2">
                <Image src="/flag.svg" alt="flag" width={32} height={32} />
                <span>Like</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

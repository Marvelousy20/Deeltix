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

export default function UserRating() {
  return (
    <section className="w-fit md:w-full">
      {review.map((item) => (
        <div
          key={item.name}
          className="mt-8 border rounded-[1.25rem]  lg:p-6 p-4"
        >
          <div className="flex flex-col justify-between items-center md:flex-row">
            {/* Profile part */}
            <div className="flex items-center justify-between">
              <div className="lg:h-12 lg:w-12 h-12 w-12 rounded-full bg-background flex justify-center items-center text-[1.5rem]">
                {item?.initial}
              </div>

              <div className="flex gap-x-1 mt-4 bg-[#FFFBE5] w-fit p-3 rounded-sm">
                <Star size={16} fill="#D4B200" stroke="#D4B200" />
                <Star size={16} fill="#D4B200" stroke="#D4B200" />
                <Star size={16} fill="#D4B200" stroke="#D4B200" />
                <Star size={16} stroke="#D4B200" />
                <Star size={16} stroke="#D4B200" />
              </div>
            </div>

            {/* rating part */}
          </div>

          {/* commment */}
          {/* <div className="pt-4">
            <div>
              <label className="text-grayHelp text-lg font-medium">
                Special requests (optional)
              </label>
              <Input
                placeholder="e.g a Table next to a window"
                className="text-grayInactive text-lg font-normal mt-2"
                {...register("specialRequest", {
                  required: false,
                })}
              />
              {errors.specialRequest && (
                <div className="text-red-500 text-sm font-normal pt-1">
                  {errors.specialRequest?.message}
                </div>
              )}
            </div>
          </div> */}
        </div>
      ))}
    </section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { BookmarkCard } from "./bookmark-card";

export default function BookmarkSlider() {
  const router = useRouter();

  return (
    <section>
      <div className="bg-[#F7F7F7] pt-32">
        <div className="flex flex-col items-center pt-20">
          <h3 className=" text-[56px] font-medium text-grayBlack pb-8">
            My bookmarks
          </h3>
        </div>
      </div>
      <div className="mx-auto w-[85%]">
        <h3 className=" font-medium text-4xl py-8 text-[#10181C]">
          Handpicked restaurants for you
        </h3>
        <BookmarkCard />
      </div>
    </section>
  );
}

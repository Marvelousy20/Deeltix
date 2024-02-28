import Image from "next/image";

export default function Reservation() {
  return (
    <div className="pt-5 px-8">
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-xl text-[#42474B]">Reservations</h3>
          <p className="font-normal text-base text-[#636C71]">
            Manage your restaurants reservations
          </p>
        </div>
        <div className="flex items-center gap-2 py-3 px-4 bg-[#574DFF] rounded-[40px]">
          {/* <PlusCircle color="#F0F3F8" /> */}
          <p className="text-[#F0F3F8] text-sm font-medium">new item</p>
        </div>
      </section>

      <section className="grid grid-cols-3 mt-4">
        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>Total Reservations</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">550</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>

        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>All time seated guests</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">425</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>

        <div className="flex justify-between border border-[#EAECF0] col-span-1 lg:p-10">
          <div>
            <h2>Upcoming Reservation</h2>
            <p className="text-xl lg:text-3xl mt-4 font-bold">5</p>
          </div>

          <div>
            <Image
              src="/dashboard/bell.svg"
              alt="bell"
              width={48}
              height={48}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

export default function PendinReservations() {
  return (
    <div className="flex flex-col justify-center items-center text-center border-t border-b border-black border-opacity-5 bg-[#EAECFO] mt-10 py-10 lg:py-24">
      <div>
        <Image
          src="/restaurants/reservations/empty.svg"
          alt="empty"
          width={64}
          height={64}
        />
      </div>

      <div className="mt-5">
        <h5 className="text-lg font-medium">It&apos;s empty here</h5>
        <p className="text-sm mt-2">Check here in some other time</p>
      </div>
    </div>
  );
}

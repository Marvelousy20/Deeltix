import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="">
      <Navbar /> 

      <div className="max-w-[40rem] mx-auto text-[3.5rem] text-center mt-20">
        <h1>
          Discover
          <span className="text-grayblack font-extrabold"> retaurants</span> and
          make
          <span className="text-grayblack font-extrabold"> reservations.</span>
        </h1>

        <Input
          type="search"
          placeholder="Search for a restaurant, cruisine e.t.c"
          className="mt-8 px-6 py-6"
        />
      </div>
    </main>
  );
}

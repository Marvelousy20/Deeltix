import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="bg-background pt-10">
      <nav className="bg-grayblack flex justify-between items-center rounded-[5.5rem] px-8 py-6 mx-20 text-white">
        <div className="flex items-center gap-x-10">
          <div className="flex items-center">
            <Image
              src="/dashboard/flash.svg"
              alt="img"
              width="28"
              height="28"
            />
            <span className="text-2xl">Deeltix</span>
          </div>

          <span className="font-bold text-xl">For business</span>
        </div>

        {/* location */}
        <div>Lekki</div>

        {/* Profile */}
        <div className="space-x-4">
          <Button>Sign in</Button>
          <Button variant="primary">Create Account</Button>
        </div>
      </nav>
    </div>
  );
}

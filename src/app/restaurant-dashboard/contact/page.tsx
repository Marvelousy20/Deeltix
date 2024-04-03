import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Instagram, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="relative mt-28 lg:mt-36 px-8 bg-[#FAFAFA]">
      <div className="text-center max-w-[50rem] mx-auto">
        <h1 className="text-[2.75rem] md:text-[3.2rem] lg:text-[4rem] font-medium text-[#121212]">
          Contact Us
        </h1>

        <div className="max-w-[36rem] mx-auto">
          <p className="text-lg lg:leading-[29.1px]">
            Do you have questions on how to streamline your operations, enhance
            guest experience, and maximize your revenue effortlessly. We are
            ready to answer all your questions!
          </p>

          <div className="mt-16 lg:mt-8 flex-wrap md:flex md:justify-between gap-y-8 items-center grid justify-center">
            <div className="flex gap-4 justify-center">
              <div className="border rounded-full p-3 border-[#E7EAF1]">
                <div className="bg-[#0A66C2] rounded p-0.5 flex justify-center items-center">
                  <Linkedin color="white" fill="white" size={20} />
                </div>
              </div>

              <div className="border rounded-full p-3 border-[#E7EAF1]">
                <div className="bg-[#0A66C2] rounded p-0.5 justify-center items-center">
                  <Instagram color="white" size={20} />
                </div>
              </div>

              <div className="border rounded-full p-3 border-[#E7EAF1]">
                <div className="bg-[#0A66C2] rounded p-0.5 justify-center items-center">
                  <Twitter color="white" fill="white" size={20} />
                </div>
              </div>

              <div className="border-[#E7EAF1] border rounded-full p-3">
                <div className="bg-[#0A66C2] rounded p-0.5 justify-center items-center">
                  <Facebook color="white" fill="white" size={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <a
                href="mailto:admin@deeltix.com"
                className="text-lg flex items-center gap-x-2.5"
              >
                <Mail />
                admin@deeltix.com
              </a>
            </div>
          </div>
        </div>

        {/* Get in Touch */}
        <div className="mt-28 lg:mt-40">
          <div className="mt-20">
            <h1 className="text-[#121212] text-[2.375rem] text-center font-medium">
              Get in Touch
            </h1>

            <div className="space-y-8 mt-8">
              <div className="grid space-y-8 lg:space-y-0 lg:grid-cols-2 gap-x-10">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="First Name"
                  className="px-4 py-4 border border-black w-full border-opacity-10 rounded-lg"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Last Name"
                  className="px-4 py-4 border border-black w-full border-opacity-10 rounded-lg"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-4 border border-black w-full border-opacity-10 rounded-lg"
              />

              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="Message"
                className="px-4 py-4 border border-black w-full border-opacity-10 rounded-lg"
              ></textarea>
            </div>
          </div>

          <Button
            variant="primary"
            className="text-white w-full lg:w-1/2 mt-12"
          >
            Send
          </Button>
        </div>

        {/* Ready to Transform */}
        <div className="mt-32 bg-white py-12 lg:py-[5.6rem]">
          <h1 className="text-[#2C2929] text-3xl lg:text-5xl">
            Ready to Transform Your Restaurant?
          </h1>

          <p className="mt-4 lg:px-10">
            Take the first step towards elevating your restaurant experience.
            Join DeelTix and revolutionize the way you manage reservations.
            Let&apos;`s embark on this journey together.
          </p>

          <div className=" mt-8">
            <Link
              href="/restaurant-dashboard"
              className="rounded-full bg-primary text-white px-10 py-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-5 md:px-8 lg:px-24 py-8">
        <div>
          <Link href="/restaurant-dashboard">
            <Image
              src="/dashboard/dlogo.svg"
              alt="img"
              width="80"
              height="80"
            />
          </Link>
        </div>

        <div className="text-[#565D62]">Contact Team</div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RestaurantDashboard() {
  return (
    <div className="pt-8 bg-[#FAFAFA]">
      {/* Navbar */}
      <div className="px-4 md:px-8 lg:px-[6.25rem]">
        <nav className="flex items-center justify-between px-8 py-4">
          <Image src="/dashboard/dlogo.svg" alt="img" width="80" height="80" />

          <ul className="md:flex items-center gap-x-7 hidden">
            <li>
              <Link href="/contact">Contact Team</Link>
            </li>
            <li className="font-medium">
              <Link href="/restaurant-signin">Log In</Link>
            </li>
            <li className="bg-primary text-white rounded-[40px] py-3 px-5 font-medium">
              <Link href="/restaurant-registration">Get Started</Link>
            </li>
          </ul>
        </nav>

        {/* Hero */}

        <section className="flex justify-between flex-wrap gap-5 items-center mt-8 lg:mt-16">
          {/* Text */}
          <div className="px-10 lg:px-14 py-14 col-span-1 bg-white rounded-[40px]">
            <div className="max-w-[25rem]">
              <h1 className="text-[2.5rem] lg:text-[4rem] text-[#000060] leading-[40px] lg:leading-[65px] font-medium">
                Elevate your Restaurant Experience
              </h1>
            </div>

            <p className="max-w-[25rem] mt-4">
              Streamline your operations, enhance guest experience, and maximize
              your revenue effortlessly. Join the DeelTix family today!
            </p>

            <div className="mt-10 lg:mt-32 col-span-1">
              <Link
                href="/restaurant-registration"
                className="bg-primary px-8 py-5 lg:py-4 rounded-[40px] text-white font-medium justify-center flex items-center gap-2 w-full lg:w-[50%]"
              >
                Get Started
                <span>
                  <Image
                    src="/dashboard/arrow-circle-right.svg"
                    alt="img"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/dashboard/hero.svg"
              alt="hero"
              width={608}
              height={584}
            />
          </div>
        </section>
      </div>

      {/* Section black*/}
      <section className="mt-20 lg:mt-36 bg-black text-white py-20 lg:py-40 px-3 lg:px-[6.25rem]">
        <div>
          <h1 className="text-[2rem] lg:text-[3.5rem] font-medium text-center">
            <span className="text-[#667085]">Seamless Reservations, </span>
            <span>Exceptional Service</span>
          </h1>
        </div>

        <div className="">
          <div className="mt-[5.5rem] grid grid-cols-1 lg:grid-cols-5 gap-x-10">
            <div className="grid gap-y-4 lg:col-span-3">
              <div className="">
                <div className="bg-[#574DFF] rounded-[20px] px-6 lg:px-8 pt-8 xl:pt-12">
                  <h3 className="text-2xl font-medium">
                    Integrated Schedule Manager
                  </h3>

                  <p className="mt-4 max-w-xl">
                    Seamlessly merging precision with convenience, this tool is
                    your restaurant&apos;s key to maintaining harmony in the
                    fast-paced world of reservations.
                  </p>

                  <div className="flex justify-end mt-12">
                    <Image
                      src="/dashboard/receipt.svg"
                      alt="receipt"
                      width={545}
                      height={800}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#FEFEFE] rounded-[20px] px-6 lg:px-8 pt-8 lg:pt-12 lg:pb-8 pb-8 text-black lg:w-[503px] lg:hidden mb-4">
                <h3 className="text-2xl font-medium">Adaptability</h3>

                <p className="max-w-lg">
                  Manage reservations on-the-go with our user-friendly mobile
                  web interface.
                </p>
              </div>

              <div className="bg-[#101828] rounded-[20px] px-6 lg:px-8 pt-8 lg:pt-12 h-[26rem] lg:flex flex-col justify-center hidden">
                <h3 className="text-2xl font-medium">Real-time Analytics</h3>

                <p>
                  Gain valuable insights into your restaurant&apos;s
                  performance, financial data & customer preferences.
                </p>
              </div>
            </div>

            <div className="grid gap-y-4 lg:col-span-2 justify-self-end">
              <div className="bg-[#FEFEFE] rounded-[20px] px-6 lg:px-8 pt-8 lg:pt-12 lg:pb-8 text-black lg:w-[503px] hidden lg:block">
                <h3 className="text-2xl font-medium">Adaptability</h3>

                <p className="max-w-lg">
                  Manage reservations on-the-go with our user-friendly mobile
                  web interface.
                </p>
              </div>

              <div className="bg-[#101828] rounded-[20px] px-6 lg:px-8 pt-8 pb-8 lg:pt-12 flex flex-col justify-center lg:hidden order-3">
                <h3 className="text-2xl font-medium">Real-time Analytics</h3>

                <p>
                  Gain valuable insights into your restaurant&apos;s
                  performance, financial data & customer preferences.
                </p>
              </div>

              <div className="order-2">
                <Image
                  src="/dashboard/woman.svg"
                  alt="woman"
                  width={503}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap lg:flex-nowrap mt-4 gap-4">
          <div className="bg-white rounded-[20px] p-8 text-black w-full">
            <h3 className="text-2xl font-medium">Effortless Reservations</h3>

            <p className="max-w-lg mt-4">
              Simplify your booking process and empower your guests to reserve
              tables hassle-free
            </p>

            <div className="bg-[#1D2939] h-80 w-full mt-8 rounded-[40px]"></div>
          </div>
          <div className="bg-white rounded-[20px] p-8 text-black w-full">
            <h3 className="text-2xl font-medium">
              In-house and online waitlist
            </h3>

            <p className="max-w-lg mt-4">
              Don&apos;t turn guests away! Use waitlist to fill empty seats and
              cancellations with people eager to dine with you.
            </p>
            <div className="bg-[#1D2939] h-80 w-full mt-8 rounded-[40px]"></div>
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="py-20 lg:pt-52 flex items-center flex-wrap lg:flex-nowrap px-3 lg:px-[6.25rem] gap-x-6 lg:pb-28">
        <div className="order-2">
          <div className="bg-white px-6 py-8 lg:p-8 rounded-[20px]">
            <h3 className="text-2xl font-medium">Sign Up</h3>
            <p className="text-xl">
              Create your DeelTix account in minutes. No technical expertise
              required.
            </p>
          </div>

          <div className="bg-white px-6 py-8 lg:p-8 mt-8 rounded-[20px]">
            <h3 className="text-2xl font-medium">Customize Your Plan</h3>
            <p className="lg:text-xl">
              Choose the plan that suits your restaurant&apos;s unique needs.
              Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="bg-white px-6 py-8 lg:p-8 mt-8 rounded-[20px]">
            <h3 className="text-2xl font-medium">Onboard Your Plan</h3>
            <p className="lg:text-xl">
              Empower your staff with training resources and support. Watch your
              restaurant thrive with DeelTix!
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-3">
          <div className="bg-[#1D2939] h-[577px] w-[23rem] lg:w-[610px] mt-8 rounded-[40px]"></div>
        </div>
      </section>

      {/* Last section */}
      <section className="bg-white flex flex-col items-center py-12 lg:py-[5.6rem] px-3 shadow">
        <h1 className="text-[2rem] lg:text-5xl font-medium text-center">
          Ready to Transform Your Restaurant?
        </h1>

        <p className="lg:text-xl mt-4 max-w-4xl text-center">
          Take the first step towards elevating your restaurant experience. Join
          DeelTix and revolutionize the way you manage reservations. Let&apos;s
          embark on this journey together.
        </p>

        <div className="bg-primary text-white rounded-[40px] py-3 px-5 font-medium mt-8">
          <Link href="/restaurant-registration">Get Started</Link>
        </div>
      </section>

      {/* footer */}
      <footer className="flex justify-between py-0 pb-10 lg:py-10 px-5 lg:px-[6.2rem] bg-white">
        <Image src="/dashboard/dlogo.svg" alt="img" width="80" height="80" />

        <Link href="/contact">Contact Team</Link>
      </footer>
    </div>
  );
}

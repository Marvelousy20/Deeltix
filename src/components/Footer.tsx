import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" lg:bg-milky bg-grayblack mt-20">
      <div className="py-12 w-full  px-20 hidden lg:block">
        <div className="flex justify-between ">
          <div>
            <h1>Deeltix</h1>
          </div>

          <div className="flex flex-col items-center">
            <ul className="flex gap-16">
              <li>
                <a href="/about us">About us</a>
              </li>
              <li>
                <a href="/policy">Policy</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
            </ul>

            <div className="flex justify-center text-[#565D62] mt-10">
              ©2023, by DeelTix LLC. DeelTix is a registered company
            </div>
          </div>

          <div>
            <ul className="flex gap-9">
              <li>
                <a href="#">
                  <Linkedin stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Instagram stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Twitter stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Facebook stroke="#1877F2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* mobile footer */}
      <div className="w-full py-5 flex flex-col gap-5 px-10 lg:hidden">
        <div>
          <Image src="/dashboard/logo.svg" alt="img" width="80" height="80" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <ul className="flex flex-col gap-5 text-background">
              <li>
                <a href="/about us">About us</a>
              </li>
              <li>
                <a href="/policy">Policy</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>

            <ul className="flex flex-col gap-5 text-background">
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex items-center justify-between">
              <li>
                <a href="#">
                  <Linkedin stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Instagram stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Twitter stroke="#1877F2" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Facebook stroke="#1877F2" />
                </a>
              </li>
            </ul>
          </div>

          <div className="flex justify-center text-background max-w-[500px]">
            ©2024, by DeelTix
          </div>
        </div>
      </div>
    </footer>
  );
}

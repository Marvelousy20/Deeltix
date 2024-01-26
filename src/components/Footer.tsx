import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 w-full bg-milky mt-20 px-20">
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
            ©2023, by DeelTix LLC. DeelTix is a registered company, UK Co.
            [14806326]
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
    </footer>
  );
}

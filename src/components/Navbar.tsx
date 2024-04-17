"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import LoggedInNavbar from "@/components/LoggedInUserNavbar";
import { useDisclosure } from "@mantine/hooks";
import { SignUp } from "./ui/modals/sign-up";
import ModalSignIn from "./ui/modals/sign-in";
import Link from "next/link";
import { useUser } from "@/context/user/user";
import { useRouter } from "next/navigation";
import ModalPassword from "./ui/modals/modal-password";
import { useState } from "react";

export default function Navbar({
  signinOpen,
  open,
}: {
  signinOpen: any;
  open: any;
}) {
  const [login, { open: loginOpen, close: loginClose }] = useDisclosure(false);
  const [opened, { open: signup, close }] = useDisclosure(false);

  const { push } = useRouter();
  const { isLoggedIn } = useUser();
  console.log(isLoggedIn);

  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  return (
    <div>
      <header className="overflow-hidden">
        {isLoggedIn ? (
          <LoggedInNavbar />
        ) : (
          <section className="">
            <div className="pt-10 fixed w-full hidden lg:block z-[999]">
              <section className="bg-grayblack flex justify-between items-center rounded-[5.5rem] px-8 py-6 mx-20 text-white">
                <div className="flex items-center gap-x-10">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/dashboard/logo.svg"
                      alt="img"
                      width="80"
                      height="80"
                    />
                  </Link>

                  <Link
                    href="/restaurant-dashboard"
                    className="font-bold text-xl hover:text-primary transition-all ease-in duration-500"
                  >
                    For business
                  </Link>
                </div>

                {/* location */}
                {/* <div className="cursor-pointer">Lekki</div> */}

                {/* Profile */}
                <div className="space-x-4">
                  <Button onClick={loginOpen}>Sign in</Button>

                  <Button variant="primary" onClick={signup}>
                    Create Account
                  </Button>
                </div>
              </section>
            </div>

            {/* mobile nav */}

            <nav className=" flex lg:hidden flex-col  items-start gap-6 text-white">
              <div className="">
                <Link
                  href="/restaurant-dashboard"
                  className="font-bold text-xl transition-all ease-in-out duration-200"
                >
                  For business
                </Link>
              </div>

              {/* location */}
              {/* <div>Lekki</div> */}

              <div className="flex flex-col space-y-4">
                <Button
                  className="lg:hidden block"
                  size="sm"
                  variant="primary"
                  // onClick={signinOpen}
                  onClick={() => push("/user-signin")}
                >
                  Sign in
                </Button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => push("/user-signup")}
                >
                  Create Account
                </Button>
              </div>
              <ModalSignIn opened={login} close={loginClose} />
              <SignUp opened={opened} close={close} />
            </nav>
          </section>
        )}
      </header>
    </div>
  );
}

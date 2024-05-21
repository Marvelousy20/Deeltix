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
import { Turn as Hamburger } from "hamburger-react";

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

  const [isOpened, setOpen] = useState(false);

  // const openModal = () => {
  //   setIsOpened(true);
  // };

  return (
    <div className="!z-[1000] relative">
      <header className="overflow-hidden">
        {isLoggedIn ? (
          <LoggedInNavbar />
        ) : (
          <section className="relative">
            <div className="lg:pt-10 fixed top-0 w-full lg:block">
              <section className="bg-grayblack relative flex justify-between items-center lg:rounded-[5.5rem] px-8 py-6 lg:mx-20 text-white">
                <div className="lg:flex items-center gap-x-10">
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
                    className="font-bold hidden lg:block text-xl hover:text-primary transition-all ease-in duration-500"
                  >
                    For business
                  </Link>
                </div>

                {/* location */}
                {/* <div className="cursor-pointer">Lekki</div> */}

                {/* Profile */}
                <div className="space-x-4 hidden lg:block">
                  <Button onClick={loginOpen}>Sign in</Button>

                  <Button variant="primary" onClick={signup}>
                    Create Account
                  </Button>

                  <ModalSignIn opened={login} close={loginClose} />
                  <SignUp opened={opened} close={close} />
                </div>

                <div className="lg:hidden">
                  <Hamburger size={20} toggled={isOpened} toggle={setOpen} />
                </div>

                {/* mobile nav */}
                {isOpened && (
                  <div className="absolute top-full w-full bg-grayblack right-0 left-0 p-8">
                    <nav className=" flex lg:hidden flex-col items-start text-white">
                      <div className="flex flex-col space-y-4 w-full items-center">
                        <div className="mb-4">
                          <Link
                            href="/restaurant-dashboard"
                            className="font-bold transition-all text-xl ease-in-out duration-200 w-4/5"
                          >
                            For business
                          </Link>
                        </div>
                        <Button
                          variant="primary"
                          onClick={() => push("/user-signin")}
                          className="w-4/5"
                        >
                          Sign in
                        </Button>

                        <Button
                          variant="primary"
                          onClick={() => push("/user-signup")}
                          className="w-4/5"
                        >
                          Create Account
                        </Button>
                      </div>
                    </nav>
                  </div>
                )}
              </section>
            </div>
          </section>
        )}
      </header>
    </div>
  );
}

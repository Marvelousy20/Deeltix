"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Modal from "@/components/ui/Modal";
import Signup from "@/components/signup";
import Signin from "@/components/signin";
import ForgetPassword from "@/components/ForgetPassword";
import LoggedInNavbar from "@/components/LoggedInUserNavbar";
import { X } from "lucide-react";
import ModalPassword from "./ui/modals/modal-password";
import { useDisclosure } from "@mantine/hooks";
import { SignUp } from "./ui/modals/sign-up";
import { SuccessMessage } from "./ui/modals/password-success";
import ModalSignIn from "./ui/modals/sign-in";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  // const [success, { open: successOpen, close: successClose }] =
  //   useDisclosure(false);
  const [signin, { open: signinOpen, close: signinClose }] =
    useDisclosure(false);

  const [showModal, setShowModal] = useState(false);
  const [signUpModal, setsignUpModal] = useState(false);
  const [resetpassword, setResetpassword] = useState(false);

  let authorization = true;
  return (
    <header>
      {authorization ? (
        <section>
          <div className="pt-10 fixed w-full z-50 hidden lg:block">
            <section className="bg-grayblack flex justify-between items-center rounded-[5.5rem] px-8 py-6 mx-20 text-white">
              <div className="flex items-center gap-x-10">
                <div className="flex items-center">
                  <Image
                    src="/dashboard/logo.svg"
                    alt="img"
                    width="80"
                    height="80"
                  />
                </div>

                <span className="font-bold text-xl">For business</span>
              </div>

              {/* location */}
              <div className="cursor-pointer">Lekki</div>

              {/* Profile */}
              {/* onClick={() => setsignUpModal(true)} */}
              <div className="space-x-4">
                <Button onClick={signinOpen}>Sign in</Button>

                <Button variant="primary" onClick={open}>
                  Create Account
                </Button>
              </div>
            </section>
            {/* <SuccessMessage opened={success} close={successClose} /> */}
            <ModalSignIn opened={signin} close={signinClose} />
            <SignUp opened={opened} close={close} />
            {/* {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <Signup />
              </Modal>
            )} */}
            /
            {/* {resetpassword && (
              <Modal onClose={() => setResetpassword(false)}>
                <ForgetPassword />
              </Modal>
            )} */}
          </div>

          {/* mobile nav */}

          <nav className=" flex lg:hidden flex-col items-start gap-6 text-white">
            <div className="">
              <span className="font-bold text-xl">For business</span>
            </div>

            {/* location */}
            <div>Lekki</div>

            {/* Profile */}
            {/* onClick={() => setsignUpModal(true)} */}
            <div className="flex flex-col space-y-4">
              <Button
                size="sm"
                variant="primary"
                onClick={() => setsignUpModal(true)}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setShowModal(true)}
              >
                Create Account
              </Button>
            </div>
            {/* {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <Signup />
              </Modal>
            )}
            {signUpModal && (
              <Modal onClose={() => setsignUpModal(false)}>
                <Signin />
              </Modal>
            )}
            {resetpassword && (
              <Modal onClose={() => setResetpassword(false)}>
                <ForgetPassword />
              </Modal>
            )} */}
          </nav>
        </section>
      ) : (
        <LoggedInNavbar />
      )}
    </header>
  );
}

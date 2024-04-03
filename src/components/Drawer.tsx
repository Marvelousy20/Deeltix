"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import Navbar from "./Navbar";
import ModalSignIn from "./ui/modals/sign-in";
import { useDisclosure } from "@mantine/hooks";
import { SignUp } from "./ui/modals/sign-up";
import ModalPassword from "./ui/modals/modal-password";

function UserDrawer() {
  const [signin, { open: signinOpen, close: signinClose }] =
    useDisclosure(false);
  const [opened, { open: signup, close }] = useDisclosure(false);
  const [forgotpasswordOpen, { open, close: forgotpasswordClose }] =
    useDisclosure(false);

  return (
    <section>
      <Drawer>
        <DrawerTrigger>
          <Menu color="white" size={30} />
        </DrawerTrigger>
        <DrawerContent className="">
          <DrawerHeader>
            <div
              className="flex
           justify-between items-start w-full"
            >
              <Navbar signinOpen={signinOpen} open={signup} />
              <DrawerClose>
                <X color="white" size={30} />
              </DrawerClose>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
      {signin && <ModalSignIn opened={signin} close={signinClose} />}
      {opened && <SignUp opened={opened} close={close} />}
      <ModalPassword opened={forgotpasswordOpen} close={forgotpasswordClose} />
    </section>
  );
}
export default UserDrawer;

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { SketchPicker } from "react-color";
import { QRCode } from "react-qrcode-logo";
import { QrFrame } from "@/components/QRCode-frames/first-frame";
import { SecondFrame } from "@/components/QRCode-frames/second-frame";
import { ThirdFrame } from "@/components/QRCode-frames/third-frame";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Download } from "lucide-react";
import { any, string } from "prop-types";
import { useUser } from "@/context/restaurant/user";
import { frame } from "framer-motion";
import { toPng } from "html-to-image";

const formSchema = z.object({
  foreground: z.string().min(2, {
    message: "Enter color code",
  }),
  background: z.string().min(2, {
    message: "Enter color code",
  }),
  restaurantName: z.string().min(2, {
    message: "Enter restaurant name",
  }),
  textColor: z.string().min(2, {
    message: "Enter text color",
  }),
});
export const RestaurantQrCode = () => {
  const [resId, setResId]: any = useState("");
  const { restaurantId } = useUser();
  const [restaurantName, setRestaurantName] = useState("");
  const [slider, setSlider] = useState([0]);
  const [radius, setRadius] = useState([0]);
  const [size, setSize] = useState([16]);
  const [color, setColor] = useState("#FFF");
  const [fcolor, setFcolor] = useState("#000");
  const [show, setShow] = useState(false);
  const [fshow, setFshow] = useState(false);

  // new
  const [activeFrame, setActiveFrame] = useState(1);

  const HandleActiveFrame = (frameNumber: number) => {
    setActiveFrame(frameNumber);
  };

  const handleShow = () => {
    setShow(!show);
  };
  const handleFshow = () => {
    setFshow(!fshow);
  };
  const handleChange = (colorpicker: any) => {
    setColor(colorpicker.hex);
  };
  const forchange = (forecolor: any) => {
    setFcolor(forecolor.hex);
  };
  const inputChange = (e: any) => {
    setColor(e.target.value);
  };
  const foreInputChange = (e: any) => {
    setFcolor(e.target.value);
  };

  const [qrstyles, setQrStyles] = useState({});

  const { handleSubmit, register, formState, reset, watch, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foreground: "",
      background: "",
      restaurantName: "",
      textColor: "",
    },
  });
  const ref = useRef<HTMLDivElement>(null);
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //   mutate(values);
  };

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = restaurantName
          ? `${restaurantName}-qr.png`
          : "RestaurantQr.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  return (
    <div className="flex w-full items-center justify-center p-5 lg:p-8">
      <section className="w-full lg:w-auto">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl lg:text-2xl text-[#000000]">
              QR Code Generator
            </h3>
            <p className="font-normal text-base text-grayInactive">
              Create and edit your Restaurant QR Code
            </p>
          </div>
          <section className="flex flex-col lg:flex-row items-start gap-6 gap-y-52 w-full">
            <div className="border relative border-grayBottom rounded-[24px] p-4 lg:p-6 max-w-lg lg:w-[60rem] order-2 lg:order-1 w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-grayHelp text-lg font-medium">
                    Select frame
                  </h3>
                  <div className="flex items-center gap-4">
                    <div
                      className={`${
                        activeFrame == 1 &&
                        "border-2 bg-[#574DFF] border-[#574DFF]"
                      }`}
                    >
                      <Image
                        src="/restaurants/third-frame.png"
                        width={60}
                        height={60}
                        alt="First-frame"
                        onClick={() => setActiveFrame(1)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div
                      className={`${
                        activeFrame == 2 &&
                        "border-2 bg-[#574DFF] border-[#574DFF]"
                      }`}
                    >
                      <Image
                        src="/restaurants/second-frame.png"
                        width={60}
                        height={60}
                        alt="First-frame"
                        onClick={() => setActiveFrame(2)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div
                      className={`${
                        activeFrame == 3 &&
                        "border-2 bg-[#574DFF] border-[#574DFF]"
                      }`}
                    >
                      <Image
                        src="/restaurants/first-frame.png"
                        width={60}
                        height={60}
                        alt="First-frame"
                        onClick={() => setActiveFrame(3)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Foreground color
                  </label>
                  {fshow ? (
                    <SketchPicker color={fcolor} onChangeComplete={forchange} />
                  ) : null}

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter full name"
                      className="text-grayInactive text-lg font-normal mt-2 w-full"
                      value={fcolor}
                      onChange={foreInputChange}
                    />
                    <div
                      onClick={handleFshow}
                      className="h-[40px] w-[40px] bg-[#574DFF] rounded-lg"
                    ></div>
                  </div>
                  {errors.foreground && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.foreground.message}
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Background color
                  </label>
                  {show ? (
                    <SketchPicker
                      color={color}
                      onChangeComplete={handleChange}
                    />
                  ) : null}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter full name"
                      value={color}
                      onChange={inputChange}
                      // onChange={(val) => setColor(val)}
                      className="text-grayInactive text-lg font-normal mt-2 w-full"
                      // {...register("background", {
                      //   required: true,
                      // })}
                    />
                    <div
                      onClick={handleShow}
                      className="h-[40px] w-[40px] bg-[#574DFF] rounded-lg"
                    ></div>
                  </div>
                  {errors.background && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.background.message}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p>Padding</p>
                    <p>{`${slider}px`}</p>
                  </div>
                  <Slider
                    value={slider}
                    onValueChange={(value) => setSlider(value)}
                    // defaultValue={[33]}
                    max={100}
                    step={1}
                    color="#574DFF"
                    className="text-[#574DFF]"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p>Corner Radius</p>
                    <p>{`${radius}px`}</p>
                  </div>
                  <Slider
                    value={radius}
                    onValueChange={(value) => setRadius(value)}
                    // defaultValue={[33]}
                    max={100}
                    step={1}
                    color="#574DFF"
                    className="text-[#574DFF]"
                  />
                </div>
                <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Restaurant name
                  </label>
                  <Input
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    placeholder="Enter restaurant name"
                    className="text-grayInactive text-lg font-normal mt-2 w-full"
                    // {...register("restaurantName", {
                    //   required: true,
                    // })}
                  />
                  {errors.restaurantName && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.restaurantName.message}
                    </div>
                  )}
                </div>

                {/* <div>
                  <label className="text-grayHelp text-lg font-medium">
                    Text color
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter full name"
                      className="text-grayInactive text-lg font-normal mt-2 w-full"
                      {...register("textColor", {
                        required: true,
                      })}
                    />
                    <div className="h-[40px] w-[40px] bg-[#574DFF] rounded-lg"></div>
                  </div>
                  {errors.textColor && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.textColor.message}
                    </div>
                  )}
                </div> */}
                {/* <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p>Size</p>
                    <p>{`${size}px`}</p>
                  </div>
                  <Slider
                    value={size}
                    onValueChange={(value) => setSize(value)}
                    // defaultValue={[33]}
                    max={100}
                    step={1}
                    color="#574DFF"
                    className="text-[#574DFF]"
                  />
                </div> */}

                <div className="flex lg:justify-end">
                  <Button
                    type="submit"
                    className="flex gap-2 bg-[#574DFF] w-full lg:w-[6.4rem] text-white mt-10"
                  >
                    <Save size={15} />
                    Save
                  </Button>
                </div>
              </form>
            </div>
            <div className="h-[150px] mt-10 lg:mt-0 lg:w-[150px] order-1 lg:order-2 lg:block flex justify-center w-full items-center">
              <section>
                <div
                  ref={ref}
                  className={`w-fit h-fit rounded-lg p-2 shadow-inherit border border-grayBottom`}
                  style={{
                    padding: `${slider}px`,
                    // borderRadius: `${radius}px`,
                    backgroundColor: `${color}`,
                    overflow: "hidden",
                  }}
                >
                  <QrFrame
                    frame={activeFrame}
                    url={`https://www.deeltix.com/restaurant/${restaurantId}/menu`}
                    color={color}
                    fcolor={fcolor}
                    name={restaurantName}
                    numbers={[radius, radius, radius, radius]}
                  />
                </div>
                <div className="flex justify-center w-full">
                  <Button
                    onClick={onButtonClick}
                    type="submit"
                    className="flex gap-2 bg-[#574DFF] w-full text-white mt-5"
                  >
                    <Save size={15} />
                    Download
                  </Button>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import { SketchPicker } from "react-color";
import { QRCode } from "react-qrcode-logo";
import { FirstFrame } from "@/components/QRCode-frames/first-frame";
import { SecondFrame } from "@/components/QRCode-frames/second-frame";
import { ThirdFrame } from "@/components/QRCode-frames/third-frame";

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
  const [slider, setSlider] = useState([0]);
  const [radius, setRadius] = useState([0]);
  const [size, setSize] = useState([16]);
  const [color, setColor] = useState("#FFF");
  const [fcolor, setFcolor] = useState("#000");
  const [show, setShow] = useState(false);
  const [fshow, setFshow] = useState(false);
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

  // Frame states
  const [firstFrame, setFirstFrame] = useState(false);
  const [secondFrame, setSecondFrame] = useState(false);
  const [thirdFrame, setThirdFrame] = useState(false);

  const handleFirstFrame = () => {
    setFirstFrame(!firstFrame);
  };

  const handleSecondFrame = () => {
    setSecondFrame(!secondFrame);
  };

  const handleThirdFrame = () => {
    setThirdFrame(!thirdFrame);
  };
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
  const { errors } = formState;
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //   mutate(values);
    console.log(values);
  };
  return (
    <div className="flex w-full items-center  justify-center">
      <section className="">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl text-[#000000]">
              QR Code Generator
            </h3>
            <p className="font-normal text-base text-grayInactive">
              Create and edit your Restaurant QR Code
            </p>
          </div>
          <section className="flex items-start  gap-6">
            <div className="border border-grayBottom rounded-[24px] p-4 lg:p-6 max-w-lg lg:w-[60rem]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-grayHelp text-lg font-medium">
                    Select frame
                  </h3>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/restaurants/third-frame.png"
                      width={60}
                      height={60}
                      alt="First-frame"
                      onClick={handleThirdFrame}
                      className="cursor-pointer"
                    />
                    <Image
                      src="/restaurants/second-frame.png"
                      width={60}
                      height={60}
                      alt="First-frame"
                      onClick={handleFirstFrame}
                      className="cursor-pointer"
                    />
                    <Image
                      src="/restaurants/first-frame.png"
                      width={60}
                      height={60}
                      alt="First-frame"
                      onClick={handleSecondFrame}
                      className="cursor-pointer"
                    />
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
                    placeholder="Enter full name"
                    className="text-grayInactive text-lg font-normal mt-2 w-full"
                    {...register("restaurantName", {
                      required: true,
                    })}
                  />
                  {errors.restaurantName && (
                    <div className="text-red-500 text-sm font-normal pt-1">
                      {errors.restaurantName.message}
                    </div>
                  )}
                </div>

                <div>
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
                </div>
                <div className="flex flex-col gap-3">
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
                </div>
              </form>
            </div>
            {/* <div className="w-[150px] h-[150px] bg-red-500"></div> */}
            <div className="h-[150px] w-[150px]">
              {thirdFrame ? (
                <div
                  className={`border border-grayBottom rounded-[24px] w-fit h-fit`}
                  style={{
                    padding: `${slider}px`,
                    borderRadius: `${radius}px`,
                    backgroundColor: `${color}`,
                  }}
                >
                  <ThirdFrame color={color} fcolor={fcolor} />
                </div>
              ) : firstFrame ? (
                <div
                  className={`border border-grayBottom rounded-[24px] w-fit h-fit`}
                  style={{
                    padding: `${slider}px`,
                    borderRadius: `${radius}px`,
                    backgroundColor: `${color}`,
                  }}
                >
                  <FirstFrame color={color} fcolor={fcolor} size={size} />
                </div>
              ) : secondFrame ? (
                <div
                  className={`border border-grayBottom rounded-[24px] w-fit h-fit`}
                  style={{
                    padding: `${slider}px`,
                    borderRadius: `${radius}px`,
                    backgroundColor: `${color}`,
                    overflow: "hidden",
                  }}
                >
                  <SecondFrame color={color} fcolor={fcolor} f2size={size} />
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
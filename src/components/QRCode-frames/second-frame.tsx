"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const SecondFrame = ({
  color,
  fcolor,
  name,
  numbers,
}: {
  color: string;
  fcolor: string;
  name: string;
  numbers: any;
}) => {
  return (
    <div className="bg-black p-[4px] rounded-b-[8px]">
      <div className="text-white text-base max-w-[150px] flex items-center justify-center">
        {name}
      </div>
      <QRCode
        value="https://www.deeltix.com/"
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        eyeRadius={numbers}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
    </div>
  );
};

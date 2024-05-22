"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const FirstFrame = ({
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
    <div className="bg-black p-[4px] rounded-t-[8px] rounded-b-[8px] overflow-hidden">
      <QRCode
        value="https://www.deeltix.com/"
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        eyeRadius={numbers}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
      <div className="text-white flex max-w-[150px] items-center text-base justify-center">
        {name}
      </div>
    </div>
  );
};

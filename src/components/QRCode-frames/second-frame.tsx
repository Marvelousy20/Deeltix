"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const SecondFrame = ({
  color,
  fcolor,
  name,
  numbers,
  url
}: {
  color: string;
  fcolor: string;
  name: string;
  numbers: any;
  url?: string;
}) => {
  return (
    <div className="bg-black p-[4px] rounded-b-[8px]">
      <div className="text-white text-base max-w-[150px] flex items-center justify-center">
        {name}
      </div>
      <QRCode
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        eyeRadius={numbers}
        value={url}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
    </div>
  );
};

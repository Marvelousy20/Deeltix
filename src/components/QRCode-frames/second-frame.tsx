"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const SecondFrame = ({
  color,
  fcolor,
}: {
  color: string;
  fcolor: string;
}) => {
  return (
    <div className="bg-black p-[4px] rounded-t-[20px] rounded-b-[8px]">
      <div className="text-white text-base flex items-center justify-center">
        Deeltix.com
      </div>
      <QRCode
        value="https://www.deeltix.com/"
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
    </div>
  );
};

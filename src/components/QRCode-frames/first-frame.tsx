"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const FirstFrame = ({
  color,
  fcolor,
}: {
  color: string;
  fcolor: string;
}) => {
  return (
    <div className="bg-black p-[4px] rounded-t-[8px] rounded-b-[20px] overflow-hidden">
      <QRCode
        value="https://www.deeltix.com/"
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
      <div className="text-white flex items-center text-base justify-center">
        Deeltix.com
      </div>
    </div>
  );
};

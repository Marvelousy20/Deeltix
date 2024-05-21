"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const FirstFrame = ({
  color,
  fcolor,
  size,
}: {
  color: string;
  fcolor: string;
  size: number[];
}) => {
  return (
    <div className="bg-black p-[4px] rounded-t-[8px] rounded-b-[20px]">
      <QRCode
        value="https://www.deeltix.com/"
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        // qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
      <div
        style={{
          fontSize: `${size}px`,
        }}
        className="text-white flex items-center justify-center"
      >
        Deeltix.com
      </div>
    </div>
  );
};

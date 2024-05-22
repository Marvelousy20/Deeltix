"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";

export const ThirdFrame = ({
  color,
  fcolor,
  numbers,
}: {
  color: string;
  fcolor: string;
  numbers: any;
}) => {
  return (
    <QRCode
      value="https://www.deeltix.com/"
      bgColor={`${color}`}
      fgColor={`${fcolor}`}
      eyeRadius={numbers}
      // qrStyle={'fluid'}
      // logoImage="/dashboard/logo.svg"
    />
  );
};

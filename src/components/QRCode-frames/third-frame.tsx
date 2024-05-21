"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";
export const ThirdFrame = ({
  color,
  fcolor,
}: {
  color: string;
  fcolor: string;
}) => {
  return (
    <QRCode
      value="https://www.deeltix.com/"
      bgColor={`${color}`}
      fgColor={`${fcolor}`}
      // qrStyle={'fluid'}
      // logoImage="/dashboard/logo.svg"
    />
  );
};

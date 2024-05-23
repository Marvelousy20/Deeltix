"use client";
import React from "react";
import { QRCode } from "react-qrcode-logo";

export const ThirdFrame = ({
  color,
  fcolor,
  numbers,
  url
}: {
  color: string;
  fcolor: string;
  numbers: any;
  url?: string;    // Make 'url' optional and provide a default value
}) => {
  return (
    <QRCode
      value={url}
      bgColor={color}
      fgColor={fcolor}
      eyeRadius={numbers}
      // qrStyle={'fluid'}
      // logoImage="/dashboard/logo.svg"
    />
  );
};

'use client';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
export const QrFrame = ({
  color,
  fcolor,
  name,
  numbers,
  url,
  frame = 1,
}: {
  color: string;
  fcolor: string;
  name?: string;
  numbers: any;
  url?: string;
  frame?: number;
}) => {
  return (
    <div
      className={`flex w-fit h-fit 
      ${frame == 3 && 'flex-col-reverse'}
    ${frame == 2 && 'flex-col'}
    `}
    >
      <QRCode
        value={url}
        bgColor={`${color}`}
        fgColor={`${fcolor}`}
        eyeRadius={numbers}
        qrStyle={'fluid'}
        // logoImage="/dashboard/logo.svg"
      />
      {frame !== 1 && (
        <div className="p-1 text-center">
          <p
            className={`text-center flex max-w-[150px] items-center font-bold text-base justify-center`}
            style={{ color: fcolor }}
          >
            {name}
          </p>
        </div>
      )}
    </div>
  );
};

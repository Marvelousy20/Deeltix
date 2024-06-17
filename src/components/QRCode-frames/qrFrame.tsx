'use client';
import React from 'react';
import { QRCode } from 'react-qrcode-logo';
export const QrFrame = ({
  color,
  fcolor,
  name,
  numbers,
  url,
  frame = '1',
}: {
  color: string;
  fcolor: string;
  name?: string;
  numbers: any;
  url?: string;
  frame?: undefined | string;
}) => {
  return (
    <div
      className={`flex w-fit h-fit
      ${frame == '3' && 'flex-col-reverse'}
    ${frame == '2' && 'flex-col'}
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
      {frame !== '1' && (
        <div className="p-1 text-center">
          <div
            className={`flex max-w-[150px] items-center font-bold text-base justify-center text-[${fcolor}]`}
          >
            {name}
          </div>
        </div>
      )}
    </div>
  );
};

// backgroundColor
// :
// "#FFF"
// cornerRadius
// :
// "0px"
// createdAt
// :
// "2024-05-28T00:15:04.176Z"
// foregroundColor
// :
// "#5c2525"
// frame
// :
// "2"
// id
// :
// "665522087d5e91cbca8f25da"
// padding
// :
// "0px"
// restaurant
// :
// "661d478a3bf2fc58076fb30d"
// style
// :
// "normal"
// updatedAt
// :
// "2024-06-04T20:05:50.910Z"

/* eslint-disable react/no-unescaped-entities */
import React, { useRef } from 'react';
import InputField from './InputField';
import Image from 'next/image';
import { Button } from './button';

function Modal({ onClose, children }: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      {children}
    </div>
  );
}

export default Modal;

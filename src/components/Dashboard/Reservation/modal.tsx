import React from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ opened, onClose }) => {
  if (!opened) return null;

  return (
    <div className="inset-0 flex items-center justify-center z-50 min-h-screen w-full">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="bg-white p-8 rounded w-96 text-center z-50 relative">
        <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button
          className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close Modals
        </button>
      </div>
    </div>
  );
};

export default Modal;

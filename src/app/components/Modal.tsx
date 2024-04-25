import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white w-full max-w-md p-6 rounded-lg">
        <div className="flex flex-row justify-between items-center mb-6">
          <h3 className="text-lg text-indigo-950 font-semibold">{title}</h3>
          <X
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 cursor-pointer"
          />
        </div>
        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

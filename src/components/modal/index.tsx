import { X } from 'feather-icons-react';

import RippleButton from '../ripple-button';

import './style.css';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        justify-center
        items-center
      "
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 p-8 rounded-xl text-gray-300 min-w-75 fade-in-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute w-full flex justify-end top-0 left-0 p-2">
          <RippleButton
            mode="light"
            onClick={onClose}
            className="
              cursor-pointer
              w-8 h-8 p-1
              hover:bg-gray-600
              rounded-full flex
              items-center justify-center
              hover:scale-105 active:scale-90
              transition-all duration-300
            "
          >
            <X className="w-6 h-6" />
          </RippleButton>
        </div>
        {children}
      </div>
    </div>
  );
}

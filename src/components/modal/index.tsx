'use client';

import { useEffect, useState } from 'react';
import { X, Move } from 'feather-icons-react';

import RippleButton from '../ripple-button';
import './style.css';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset]);

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true));
      setTimeout(() => setIsClosing(false));
    } else if (isVisible) {
      setTimeout(() => setIsClosing(true));
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, open]);

  if (!isVisible) return null;

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
        className={`
            ${isClosing ? 'fade-out-right' : 'fade-in-left'}
          `}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className={`
          relative bg-gray-900 p-8 rounded-xl text-gray-300 min-w-75
        `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute w-full flex justify-end items-center top-0 left-0 p-2 pointer-events-none">
            <div
              className="
              relative
              cursor-move select-none pointer-events-auto
              w-8 h-8 p-1
            "
              onMouseDown={handleMouseDown}
            >
              <Move
                className="
                absolute
                top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-5 h-5 hover:text-gray-400 transition-all duration-300
              "
              />
            </div>
            <RippleButton
              mode="light"
              onClick={onClose}
              className="
              cursor-pointer
              w-8 h-8 p-1
              hover:bg-gray-600 hover:text-gray-400
              rounded-full flex
              items-center justify-center
              hover:scale-105 active:scale-90
              transition-all duration-300
              pointer-events-auto
            "
            >
              <X className="w-6 h-6" />
            </RippleButton>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './style.css';

export default function RippleButton({
  children,
  onClick: handleClick,
  disabled,
  isState,
  title,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  mode?: 'light' | 'dark';
  classnamesonclick?: string[];
  disabled?: boolean;
  isState?: boolean;
  title?: string;
}) {
  const mode = props.mode || 'light';
  const classnamesonclick = props.classnamesonclick || [];

  const rippleClasses =
    mode === 'dark' ? ['ripple', 'dark'] : ['ripple', 'light'];

  function ripple(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;

    if (classnamesonclick.length)
      classnamesonclick.forEach((c) => button.classList.add(c));

    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    rippleClasses.forEach((c) => circle.classList.add(c));

    const existingRipple = button.getElementsByClassName('ripple-button')[0];
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(circle);

    if (classnamesonclick.length)
      setTimeout(() => button.classList.remove(...classnamesonclick), 400);

    requestAnimationFrame(() => {
      setTimeout(() => handleClick?.(e), isState ? 400 : 0);
    });

    setTimeout(() => {
      circle.remove();
    }, 600);
  }

  return (
    <button onClick={ripple} disabled={disabled} title={title} {...props}>
      {children}
    </button>
  );
}

import RippleButton from '../ripple-button';

import './styles.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function RainbowButton({ onClick, children }: Props) {
  return (
    <RippleButton
      mode="dark"
      className="rainbow-btn
        relative
        p-[12px_24px]
        text-[18px]
        font-semibold
        bg-transparent
        cursor-pointer
        border-2
        border-transparent
        rounded-lg
        overflow-hidden
        hover:scale-110 active:scale-90
        transition-all
        duration-300

        before:content-['']
        before:absolute
        before:inset-0
        before:border-2
        before:border-transparent
        before:rounded-lg
        before:bg-clip-border
      "
      onClick={onClick}
    >
      {children}
    </RippleButton>
  );
}

import './styles.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

/* Rainbow border */
// .rainbow-btn::before {
//   content: '';
// position: absolute;
// inset: 0;
// border-radius: 8px;
// padding: 2px;
// }

export default function RainbowButton({ onClick, children }: Props) {
  return (
    <button
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
        hover:scale-105 active:scale-95
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
    </button>
  );
}

import './styles.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function RainbowButton({ onClick, children }: Props) {
  return (
    <button className="rainbow-btn" onClick={onClick}>
      {children}
    </button>
  );
}

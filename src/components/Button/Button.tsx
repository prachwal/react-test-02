import './Button.scss';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function Button({ children, onClick, className, disabled = false, ...props }: ButtonProps) {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''} ${className ?? ''}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

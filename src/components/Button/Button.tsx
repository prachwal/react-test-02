import './Button.scss';
import type { ComponentChildren } from 'preact';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'
  | 'outline'
  | 'link'
  | 'minimal';

export type CornerRadius = 'none' | 'small' | 'medium' | 'large';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  children: ComponentChildren;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  cornerRadius?: CornerRadius;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ComponentChildren;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: ButtonType;
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  disabled = false,
  cornerRadius = 'medium',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const buttonClass = `button button--${variant} button--corner-${cornerRadius} button--size-${size} ${fullWidth ? 'button--full-width' : ''} ${loading ? 'button--loading' : ''} ${disabled ? 'button--disabled' : ''} ${className ?? ''}`.trim();

  const isDisabled = disabled || loading;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {loading && <span className="button__spinner"></span>}
      {icon !== undefined && iconPosition === 'left' && <span className="button__icon button__icon--left">{icon}</span>}
      <span className="button__content">{children}</span>
      {icon !== undefined && iconPosition === 'right' && <span className="button__icon button__icon--right">{icon}</span>}
    </button>
  );
}

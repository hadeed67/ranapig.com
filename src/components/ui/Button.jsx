import classNames from 'classnames';
import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  disabled = false,
  onClick,
  className,
  ...props 
}) {
  return (
    <button
      className={classNames('btn', `btn-${variant}`, className, {
        'btn-disabled': disabled
      })}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

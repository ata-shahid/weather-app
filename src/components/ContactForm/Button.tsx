
import { FC } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ type = 'button', onClick, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

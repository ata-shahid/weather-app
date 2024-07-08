
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
      className={`text-white bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 hover:bg-gradient-to-l font-semibold text-lg py-2 px-4 border border-gray-700 rounded-md shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

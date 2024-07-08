// src/components/ContactForm/Button.tsx

interface ButtonProps {
  type: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ type, onClick, children, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

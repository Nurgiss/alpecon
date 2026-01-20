interface ButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export function Button({ children, size = 'md', variant = 'primary', className = '', onClick }: ButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-6 sm:px-8 py-3 sm:py-4 text-sm',
    lg: 'px-10 py-5 text-base',
  };

  const variantClasses = {
    primary: 'bg-[#006442] text-white hover:bg-[#005236] transition-colors',
    secondary: 'bg-white text-[#006442] hover:bg-gray-100 transition-colors',
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        font-bold rounded-md uppercase tracking-wider
        shadow-lg
        w-full sm:w-auto
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
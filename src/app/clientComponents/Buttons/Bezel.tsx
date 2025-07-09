import React from "react";

interface BezelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const BezelButton: React.FC<BezelButtonProps> = ({
  children,
  onClick,
  className = "p-2 text-sm font-bold",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-b from-blue-400 to-blue-700 hover:from-blue-500 hover:to-blue-700 text-white  rounded-lg  border border-blue-400/50 hover:border-blue-900/80 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 ${className}`}
    >
      {children}
    </button>
  );
};
export const BezelDeleteButton: React.FC<BezelButtonProps> = ({
  children,
  onClick,
  className = "py-2 px-3 text-xs font-bold",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-b from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-lg border border-red-400/50 hover:border-red-900/80 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1  ${className}`}
    >
      {children}
    </button>
  );
};

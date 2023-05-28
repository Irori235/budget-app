import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: "black" | "red" | "white";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "white",
}) => {
  const bgColor =
    color === "black"
      ? "bg-gray-500 hover:bg-gray-600 text-white"
      : color === "red"
      ? "bg-red-400 hover:bg-red-500 text-white"
      : "bg-white hover:bg-gray-200 border-black text-black";

  return (
    <button
      className={`px-3 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${bgColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

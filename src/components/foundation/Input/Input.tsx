import React, { ChangeEvent } from "react";

interface InputProps {
  value: string | number;
  size?: "sm" | "md" | "lg";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, size = "md", onChange }) => {
  const width = size === "sm" ? "w-24" : size === "md" ? "w-32" : "w-48";

  return (
    <input
      type="text"
      className={`block px-4 py-2 ${width} border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm `}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

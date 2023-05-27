import React, { ChangeEvent } from "react";

interface InputProps {
  type: "number" | "text";
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, value, onChange }) => {
  const inputType = type === "number" ? "number" : "text";

  return (
    <input
      type={inputType}
      className="block w-24 px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

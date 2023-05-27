import React, { ChangeEvent } from "react";

interface InputProps {
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="block w-36 px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;

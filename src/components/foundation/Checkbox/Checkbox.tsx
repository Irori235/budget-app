import React, { ChangeEvent } from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-gray-800"></span>
    </label>
  );
};

export default Checkbox;

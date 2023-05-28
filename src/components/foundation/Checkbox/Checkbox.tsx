import React, { ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox text-purple-500 h-4 w-4"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-gray-800">{label}</span>
    </label>
  );
};

export default Checkbox;

import React from "react";
import Select from "./foundation/Select/Select";

interface SelectMonthProps {
  selectedYear: number;
  selectedMonth: number;
  onSelectYear: (year: number) => void;
  onSelectMonth: (month: number) => void;
}

const years = [...Array(5).keys()].map((i) => new Date().getFullYear() - i);
const months = [...Array(12).keys()].map((i) => i + 1);

const SelectMonth: React.FC<SelectMonthProps> = ({
  selectedYear,
  selectedMonth,
  onSelectYear,
  onSelectMonth,
}) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectMonth(Number(event.target.value));
  };

  return (
    <div className="flex flex-row">
      <Select
        options={years}
        selected={selectedYear}
        setSelected={onSelectYear}
      />
      <Select
        options={months}
        selected={selectedMonth}
        setSelected={onSelectMonth}
      />
    </div>
  );
};

export default SelectMonth;

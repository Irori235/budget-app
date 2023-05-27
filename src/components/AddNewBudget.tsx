import React, { useState } from "react";
import { Budget, Category, Item } from "../types/budget";
import Input from "./foundation/Input/Input";

interface AddNewBudgetProps {
  budget: Budget | null;
  onAddBudget: (monthBudget: number) => void;
}

const AddNewBudget: React.FC<AddNewBudgetProps> = ({
  budget,
  onAddBudget: onAddBudget,
}) => {
  const [monthBudget, setMonthBudget] = useState<number>(0);

  const onClickAdd = () => {
    if (!budget) {
      setMonthBudget(0);
      onAddBudget(monthBudget);
    }
  };

  return (
    <>
      <Input
        type="number"
        value={monthBudget}
        onChange={(e) => setMonthBudget(Number(e.target.value))}
      />

      <button onClick={onClickAdd}>追加</button>
    </>
  );
};

export default AddNewBudget;

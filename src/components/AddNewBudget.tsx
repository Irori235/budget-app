import React, { useState } from "react";
import { Budget, Category, Item } from "../types/budget";
import Input from "./foundation/Input/Input";
import Button from "./foundation/Button/Button";

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
    <div className="flex flex-col">
      <p className="px-4 py-2">Add New Budget</p>
      <div className="flex flex-row gap-4">
        <Input
          type="number"
          value={monthBudget}
          onChange={(e) => setMonthBudget(Number(e.target.value))}
        />

        <Button onClick={onClickAdd}>Add</Button>
      </div>
    </div>
  );
};

export default AddNewBudget;

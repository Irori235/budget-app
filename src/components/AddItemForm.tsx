import React, { useState } from "react";
import { Budget, Category, Item } from "../types/budget";
import Input from "./foundation/Input/Input";
import Button from "./foundation/Button/Button";

interface AddItemFormProps {
  budget: Budget | null;
  onUpdateBudget: (budget: Budget) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  budget,
  onUpdateBudget,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const onClickAdd = () => {
    console.log("onClickAdd");
    if (budget) {
      const newItem: Item = {
        name: itemName,
        cost: cost,
      };

      let newCategories = [...budget.categories];
      const index = newCategories.findIndex((c) => c.name === categoryName);

      if (index !== -1) {
        newCategories[index] = {
          ...newCategories[index],
          items: [...newCategories[index].items, newItem],
        };
      } else {
        const newCategory: Category = {
          name: categoryName,
          items: [newItem],
        };
        newCategories.push(newCategory);
      }

      const newBudget: Budget = {
        ...budget,
        categories: newCategories,
      };

      console.log("newBudget");
      console.log(newBudget);
      setCategoryName("");
      setItemName("");
      setCost(0);
      onUpdateBudget(newBudget);
    }
  };

  return (
    <>
      <Input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <Input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <Input
        type="number"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
      />
      <Button onClick={onClickAdd}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </Button>
    </>
  );
};

export default AddItemForm;

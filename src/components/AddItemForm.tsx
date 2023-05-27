import React, { useState } from "react";
import { Budget, Category, Item } from "../types/budget";
import Input from "./foundation/Input/Input";
import Button from "./foundation/Button/Button";
import { Transition } from "@headlessui/react";

interface AddItemFormProps {
  budget: Budget | null;
  onUpdateBudget: (budget: Budget) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  budget,
  onUpdateBudget,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const onClickAdd = () => {
    if (budget) {
      const newItem: Item = {
        name: itemName,
        cost: cost,
      };

      const newCategories = budget.categories.map((category) =>
        category.name === categoryName
          ? { ...category, items: [...category.items, newItem] }
          : category
      );

      if (!newCategories.find((category) => category.name === categoryName)) {
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

      setCategoryName("");
      setItemName("");
      setCost(0);
      onUpdateBudget(newBudget);
      setIsFormVisible(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "x" : "o"}
      </Button>
      <Transition show={isFormVisible}>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
          <div className=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto relative">
            <div className="flex justify-end items-center">
              <button onClick={() => setIsFormVisible(false)}>X</button>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <label className="flex justify-between">
                <span>Category</span>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </label>
              <label className="flex justify-between">
                <span>Name</span>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </label>
              <label className="flex justify-between">
                <span>Cost</span>
                <Input
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                />
              </label>
              <Button onClick={onClickAdd}>Add</Button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default AddItemForm;

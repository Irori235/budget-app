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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "x" : "o"}
      </Button>
      <Transition
        show={isFormVisible}
        enter="transition ease-out duration-300 transform"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <div className="w-full max-w-md mx-auto mt-4 relative">
          <button
            onClick={() => setIsFormVisible(false)}
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            X
          </button>
          <div className="flex flex-row gap-4">
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
              Add
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
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default AddItemForm;

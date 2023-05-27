import Button from "./foundation/Button/Button";
import Input from "./foundation/Input/Input";
import React, { useState } from "react";

interface EditMonthBudgetProps {
  monthBudget: number;
  onEditMonthBudget: (monthBudget: number) => void;
}

const EditMonthBudget: React.FC<EditMonthBudgetProps> = ({
  monthBudget,
  onEditMonthBudget,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newMonthBudget, setNewMonthBudget] = useState<number>(monthBudget);

  const onClickEdit = () => {
    onEditMonthBudget(newMonthBudget);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        {isEditing ? (
          <>
            <Input
              value={newMonthBudget}
              onChange={(e) => setNewMonthBudget(Number(e.target.value))}
            />
            <Button onClick={onClickEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </Button>
          </>
        ) : (
          <>
            <p className="px-4 py-2">{monthBudget}</p>
            <Button onClick={() => setIsEditing(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditMonthBudget;

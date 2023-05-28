import Button from "./foundation/Button/Button";
import Input from "./foundation/Input/Input";
import React, { useState } from "react";
import Toast from "./foundation/Toast/Toast";

interface EditMonthBudgetProps {
  monthBudget: number;
  onEditMonthBudget: (monthBudget: number) => void;
}

const EditMonthBudget: React.FC<EditMonthBudgetProps> = ({
  monthBudget,
  onEditMonthBudget,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newMonthBudget, setNewMonthBudget] = useState<number | string>(
    monthBudget
  );
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onClickEdit = () => {
    if (isNaN(Number(newMonthBudget))) {
      triggerToast();
      return;
    }
    onEditMonthBudget(Number(newMonthBudget));
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <Toast show={showToast} message="not number" type="error" />
      <div className="flex flex-row gap-4 ">
        {isEditing ? (
          <>
            <Input
              value={newMonthBudget}
              size="sm"
              onChange={(e) => setNewMonthBudget(e.target.value)}
            />
            <Button onClick={onClickEdit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </Button>
          </>
        ) : (
          <>
            <p className="px-4 py-2 w-24">{monthBudget}</p>
            <Button onClick={() => setIsEditing(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
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

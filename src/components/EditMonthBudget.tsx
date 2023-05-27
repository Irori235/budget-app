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
            <Button onClick={onClickEdit}>Save</Button>
          </>
        ) : (
          <>
            <p className="px-4 py-2">{monthBudget}</p>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditMonthBudget;

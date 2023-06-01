import React, { useState } from "react";
import Dropdown from "./foundation/Dropdown/Dropdown";
import Modal from "./foundation/Modal/Modal";
import Input from "./foundation/Input/Input";
import Button from "./foundation/Button/Button";
import Toast from "./foundation/Toast/Toast";

interface RenameCategoryProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleRenameCategory: (newCategoryName: string) => void;
}

const RenameCategory: React.FC<RenameCategoryProps> = ({
  isOpen,
  setIsOpen,
  handleRenameCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onClickUpdateCategory = () => {
    if (categoryName) {
      handleRenameCategory(categoryName);
      setCategoryName("");
      setIsOpen(false);
    } else {
      triggerToast();
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Toast show={showToast} message="Invalid name" type="error" />
      <div className="flex flex-col gap-4 p-4">
        <label className="flex justify-between">
          <span>NewCategory</span>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <Button onClick={onClickUpdateCategory} color="black">
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default RenameCategory;

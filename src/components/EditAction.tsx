import React, { useState } from "react";
import Dropdown from "./foundation/Dropdown/Dropdown";
import Modal from "./foundation/Modal/Modal";
import Input from "./foundation/Input/Input";
import Button from "./foundation/Button/Button";
import Toast from "./foundation/Toast/Toast";

import RenameCategory from "./RenameCategory";

interface EditActionProps {
  handleRenameCategory: (newCategoryName: string) => void;
  handleDeleteItems: () => void;
}

const EditAction: React.FC<EditActionProps> = ({
  handleRenameCategory,
  handleDeleteItems,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownOptions = [
    {
      label: "Rename",
      action: () => setIsModalOpen(true),
    },
    {
      label: "Delete",
      action: handleDeleteItems,
    },
  ];

  return (
    <>
      <Dropdown options={dropdownOptions} />
      <RenameCategory
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        handleRenameCategory={handleRenameCategory}
      />
    </>
  );
};

export default EditAction;

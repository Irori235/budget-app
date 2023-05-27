import React from "react";
import { Budget, Item } from "../types/budget";
import { useState } from "react";

interface BudgetTableProps {
  budget: Budget | null;
  onUpdateBudget: (budget: Budget) => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({
  budget,
  onUpdateBudget: onDeleteItems,
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelectItem = (item: Item, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
    }
  };

  const onClickDelete = () => {
    if (budget) {
      const newBudget: Budget = {
        ...budget,
        categories: budget.categories.map((c) => {
          return {
            ...c,
            items: c.items.filter((i) => !selectedItems.includes(i)),
          };
        }),
      };

      onDeleteItems(newBudget);
      setSelectedItems([]);
    }
  };

  if (!budget) {
    return <p>No budget data for the selected month.</p>;
  }

  return (
    <>
      <button onClick={onClickDelete}>削除</button>

      <table>
        <thead>
          <tr>
            <th>category</th>
            <th>item</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {budget.categories.map((category) => (
            <React.Fragment key={category.name}>
              {category.items.map((item) => (
                <tr key={item.name}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={(e) => handleSelectItem(item, e.target.checked)}
                    />
                  </td>
                  {item.name === category.items[0].name ? (
                    <td rowSpan={category.items.length}>{category.name}</td>
                  ) : null}
                  <td>{item.name}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BudgetTable;

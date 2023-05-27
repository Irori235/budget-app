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
    return null;
  }

  return (
    <>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        onClick={onClickDelete}
      >
        削除
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3"></th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              category
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              item
            </th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {budget.categories.map((category) => (
            <React.Fragment key={category.name}>
              {category.items.map((item) => (
                <tr key={item.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={(e) => handleSelectItem(item, e.target.checked)}
                    />
                  </td>
                  {item.name === category.items[0].name ? (
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      rowSpan={category.items.length}
                    >
                      {category.name}
                    </td>
                  ) : null}
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cost}</td>
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

import React from "react";
import { Budget, Item } from "../types/budget";
import { useState } from "react";

import AddItemForm from "./AddItemForm";

interface BudgetTableProps {
  budget: Budget | null;
  selectedItems: Item[];
  handleSelectItem: (item: Item, isSelected: boolean) => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({
  budget,
  selectedItems,
  handleSelectItem,
}) => {
  if (!budget) {
    return null;
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-1/12 px-6 py-3"> </th>
            <th className="w-3/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              category
            </th>
            <th className="w-4/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              name
            </th>
            <th className="w-4/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {budget.categories.map((category) => (
            <React.Fragment key={category.name}>
              {category.items.map((item) => (
                <tr key={item.name}>
                  <td className="w-1/12 px-6 py-4 whitespace-nowrap">
                    <input
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      type="checkbox"
                      checked={selectedItems.includes(item)}
                      onChange={(e) => handleSelectItem(item, e.target.checked)}
                    />
                  </td>
                  {item.name === category.items[0].name ? (
                    <td
                      className="w-3/12 px-6 py-4"
                      rowSpan={category.items.length}
                    >
                      {category.name}
                    </td>
                  ) : null}
                  <td className="w-4/12 px-6 py-4">{item.name}</td>
                  <td className="w-4/12 px-6 py-4">{item.cost}</td>
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

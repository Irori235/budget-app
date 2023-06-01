import React from "react";
import { Budget, Item } from "../types/budget";
import Checkbox from "./foundation/Checkbox/Checkbox";

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

  const calculateSum = (items: Item[]) =>
    items.reduce((sum, item) => sum + item.cost, 0);

  const totalCost = calculateSum(
    budget.categories.flatMap((category) => category.items)
  );
  const diff = budget.monthBudget - totalCost;

  const getColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-pink-500";
  const getSymbol = (value: number) => (value >= 0 ? "▲" : "▼");

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-1/12 px-6 py-3" />
            <th className="w-3/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="w-4/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="w-4/12 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {budget.categories.map((category) => {
            const categorySum = calculateSum(category.items);
            return (
              <React.Fragment key={category.name}>
                {category.items.map((item, index) => (
                  <tr key={item.name}>
                    <td className="w-1/12 px-6 py-4 whitespace-nowrap">
                      <Checkbox
                        checked={selectedItems.includes(item)}
                        onChange={(e) =>
                          handleSelectItem(item, e.target.checked)
                        }
                      />
                    </td>
                    {index === 0 && (
                      <td
                        className={"w-3/12 px-6 py-4 font-light text-center "}
                        rowSpan={category.items.length}
                      >
                        {category.name ? <p>{category.name}</p> : <p>-</p>}

                        <p className="px-4 text-sm text-blue-500">
                          {categorySum}
                        </p>
                      </td>
                    )}
                    <td className="w-4/12 px-6 py-4 font-light text-center">
                      {item.name}
                    </td>
                    <td className="w-4/12 px-6 py-4 font-light text-center">
                      {item.cost}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot className="bg-white">
          <tr>
            <td
              colSpan={4}
              className={`w-4/12 px-6 py-3 font-light uppercase tracking-wider ${getColor(
                diff
              )} text-right`}
            >
              {getSymbol(diff)} {Math.abs(diff)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default BudgetTable;

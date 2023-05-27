import React, { useState, useEffect, PureComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import AddItemForm from "../components/AddItemForm";
import BudgetTable from "../components/BudgetTable";
import AddNewBudget from "../components/AddNewBudget";
import SelectMonth from "../components/SelectMonth";
import { useBudgets } from "../hooks/useBudgets";
import { Budget, Category, Item } from "../types/budget";
import Button from "../components/foundation/Button/Button";

import { PureComponent as ExitIcon } from "react";
import EditMonthBudget from "../components/EditMonthBudget";

const BudgetPage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const { getBudget, updateBudget, addBudget } = useBudgets(user?.uid || "");
  const [budget, setSelectedBudget] = useState<Budget | null>(null);

  const fetchBudget = async () => {
    let newBudget = await getBudget(selectedYear, selectedMonth);
    if (!newBudget) {
      onAddBudget();
      newBudget = await getBudget(selectedYear, selectedMonth);
    }
    setSelectedBudget(newBudget);
  };

  useEffect(() => {
    fetchBudget();
  }, [selectedYear, selectedMonth]);

  const onUpdateBudget = async (budget: Budget) => {
    console.log("onUpdateBudget");
    await updateBudget(selectedYear, selectedMonth, budget);
    fetchBudget();
  };

  const onAddBudget = async () => {
    const newBudget: Budget = {
      year: selectedYear,
      month: selectedMonth,
      monthBudget: 0,
      categories: [],
    };
    await addBudget(newBudget);
    fetchBudget();
  };

  const onEditMonthBudget = async (monthBudget: number) => {
    const newBudget: Budget = {
      ...budget!,
      monthBudget: monthBudget,
    };
    await updateBudget(selectedYear, selectedMonth, newBudget);
    fetchBudget();
  };

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

      onUpdateBudget(newBudget);
      setSelectedItems([]);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="container mx-auto  px-4 py-12 flex flex-col items-center space-y-4">
      <div className="flex  py-4 min-w-full justify-end gap-2">
        <p className="px-2 py-2 text-sm text-gray-500 ">{user?.displayName}</p>
        <Button onClick={handleLogout}>
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
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Button>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2">
          <SelectMonth
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onSelectYear={setSelectedYear}
            onSelectMonth={setSelectedMonth}
          />
          {budget && (
            <EditMonthBudget
              monthBudget={budget.monthBudget}
              onEditMonthBudget={onEditMonthBudget}
            />
          )}
        </div>
        <div className="flex gap-2">
          <AddItemForm budget={budget} onUpdateBudget={onUpdateBudget} />
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
            onClick={onClickDelete}
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : budget ? (
        <BudgetTable
          budget={budget}
          selectedItems={selectedItems}
          handleSelectItem={handleSelectItem}
        />
      ) : (
        <AddNewBudget budget={budget} onAddBudget={onAddBudget} />
      )}
    </div>
  );
};

export default BudgetPage;

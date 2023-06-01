import React, { useState, useEffect, PureComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import AddItemForm from "../components/AddItemForm";
import BudgetTable from "../components/BudgetTable";
import SelectMonth from "../components/SelectMonth";
import { useBudgets } from "../hooks/useBudgets";
import { Budget, Category, Item } from "../types/budget";
import Button from "../components/foundation/Button/Button";

import { PureComponent as ExitIcon } from "react";
import EditMonthBudget from "../components/EditMonthBudget";
import Spiner from "../components/foundation/Spiner/Spiner";
import EditAction from "../components/EditAction";

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
    const newBudget: Budget = {
      ...budget,
      categories: budget.categories.filter((c) => c.items.length > 0),
    };
    await updateBudget(selectedYear, selectedMonth, newBudget);
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

  const handleRenameCategory = (newCategoryName: string) => {
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

      const newCategories: Category = {
        name: newCategoryName,
        items: selectedItems,
      };

      newBudget.categories.push(newCategories);

      onUpdateBudget(newBudget);
      setSelectedItems([]);
    }
  };

  const handleDeleteItems = () => {
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
        <Button onClick={handleLogout} color="white">
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
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col sm:flex-row justify-between w-full gap-6">
          <div className="flex flex-row gap-2 justify-center">
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
          <div className="flex gap-2 justify-end">
            <AddItemForm budget={budget} onUpdateBudget={onUpdateBudget} />
            <EditAction
              handleRenameCategory={handleRenameCategory}
              handleDeleteItems={handleDeleteItems}
            />
          </div>
        </div>

        {loading ? (
          <Spiner />
        ) : budget ? (
          <BudgetTable
            budget={budget}
            selectedItems={selectedItems}
            handleSelectItem={handleSelectItem}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;

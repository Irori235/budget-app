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
      <div className="flex px-4 py-4 min-w-full justify-end">
        <Button onClick={handleLogout}>Logout</Button>
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
            -
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

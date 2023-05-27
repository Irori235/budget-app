import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import AddItemForm from "../components/AddItemForm";
import BudgetTable from "../components/BudgetTable";
import AddNewBudget from "../components/AddNewBudget";
import SelectMonth from "../components/SelectMonth";
import { useBudgets } from "../hooks/useBudgets";
import { Budget, Category, Item } from "../types/budget";
import Button from "../components/foundation/Button/Button";

const BudgetPage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const { getBudget, updateBudget, addBudget } = useBudgets(user?.uid || "");
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const fetchBudget = async () => {
    const budget = await getBudget(selectedYear, selectedMonth);
    setSelectedBudget(budget);
  };

  useEffect(() => {
    fetchBudget();
  }, [selectedYear, selectedMonth]);

  const onUpdateBudget = async (budget: Budget) => {
    console.log("onUpdateBudget");
    await updateBudget(selectedYear, selectedMonth, budget);
    fetchBudget();
  };

  const onAddBudget = async (monthBudget: number) => {
    const newBudget: Budget = {
      year: selectedYear,
      month: selectedMonth,
      monthBudget: monthBudget,
      categories: [],
    };
    await addBudget(newBudget);
    fetchBudget();
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>

      <SelectMonth
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onSelectYear={setSelectedYear}
        onSelectMonth={setSelectedMonth}
      />

      <li>UID: {user?.uid}</li>
      <li>Year: {selectedYear}</li>
      <li>Month: {selectedMonth}</li>
      <li>Month Budget: {selectedBudget?.monthBudget}</li>
      <AddNewBudget budget={selectedBudget} onAddBudget={onAddBudget} />
      <AddItemForm budget={selectedBudget} onUpdateBudget={onUpdateBudget} />
      <BudgetTable budget={selectedBudget} onUpdateBudget={onUpdateBudget} />
    </div>
  );
};

export default BudgetPage;

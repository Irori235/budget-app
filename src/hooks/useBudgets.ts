import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { Budget, Category, Item } from "../types/budget";

export const useBudgets = (userId: string) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const userDocRef = doc(db, "users", userId);
  const budgetsCollectionRef = collection(userDocRef, "budgets");

  useEffect(() => {
    const q = query(budgetsCollectionRef, orderBy("year"), orderBy("month"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newBudgets = snapshot.docs.map((doc) => doc.data() as Budget);
      setBudgets(newBudgets);
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const addBudget = (budget: Budget) => addDoc(budgetsCollectionRef, budget);

  const updateBudget = async (
    year: number,
    month: number,
    budget: Partial<Budget>
  ) => {
    console.log(year, month, budget);
    const q = query(
      budgetsCollectionRef,
      where("year", "==", year),
      where("month", "==", month)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docRef = doc(budgetsCollectionRef, snapshot.docs[0].id);
      await updateDoc(docRef, budget);
    }
  };

  const deleteBudget = async (year: number, month: number) => {
    const q = query(
      budgetsCollectionRef,
      where("year", "==", year),
      where("month", "==", month)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docRef = doc(budgetsCollectionRef, snapshot.docs[0].id);
      await deleteDoc(docRef);
    }
  };

  const getBudget = async (year: number, month: number) => {
    const q = query(
      budgetsCollectionRef,
      where("year", "==", year),
      where("month", "==", month)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data() as Budget;
    } else {
      return null;
    }
  };

  return { budgets, addBudget, updateBudget, deleteBudget, getBudget };
};

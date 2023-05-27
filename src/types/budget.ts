// src/types/budgets.ts

export interface Item {
  name: string;
  cost: number;
}

export interface Category {
  name: string;
  items: Item[];
}

export interface Budget {
  year: number;
  month: number;
  monthBudget: number;
  categories: Category[];
}

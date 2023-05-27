import React from "react";

interface SummaryProps {
  totalBudget: number;
  remainingBudget: number;
}

const Summary: React.FC<SummaryProps> = ({ totalBudget, remainingBudget }) => {
  return (
    <div>
      <p>合計予算: {totalBudget}円</p>
      <p>残額: {remainingBudget}円</p>
    </div>
  );
};

export default Summary;

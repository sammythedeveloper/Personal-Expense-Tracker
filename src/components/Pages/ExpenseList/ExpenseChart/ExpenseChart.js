// src/components/ExpenseChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  // Categorize expenses by type and sum them
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categorizedExpenses),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categorizedExpenses),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(0, 128, 0, 0.6)",
          "rgba(255, 0, 0, 0.6)",
          "rgba(255, 165, 0, 0.6)" ,
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top', // Positioning legend at the top
        labels: {
          usePointStyle: true, // Use point styles
          padding: 20, // Space between legend items
        },
      },
      title: {
        display: true,
        text: "Expense Distribution by Category",
      },
    },
  };
  

  return (
    <div style={{ width: "400px", height: "400px" }}>
      {" "}
      {/* Adjust the size here */}
      <Pie data={data} options={options} width={400} height={400} />
    </div>
  );
};

export default ExpenseChart;

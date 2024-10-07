import React from "react";
import { Link } from "react-router-dom";
import "./ExpenseList.css"; // Import the CSS file
import ExpenseChart from "./ExpenseChart/ExpenseChart";


const ExpenseList = ({ expenses, deleteExpense }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  // Categorize expenses by type
  const categorizedExpenses = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {});

  return (
    <div className="expense-list-container">
      <div className="button-container">
      <button>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </button>
      <button>
        <Link
          to="/add-expense"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Add Expense
        </Link>
      </button>
      </div>
      <div className="chart-container">
         <h1>Your Expense List</h1>
        <ExpenseChart expenses={expenses} />
      </div>
      {/* Summary Section */}
      <div className="summary">
  <div className="category-container">
    {Object.keys(categorizedExpenses).map((category) => (
      <div key={category} className="category-box">
        <h3>{category}</h3>
        <p>
          $
          {categorizedExpenses[category]
            .reduce((acc, item) => acc + item.amount, 0)
            .toFixed(2)}
        </p>
      </div>
    ))}

    {/* Add a total expenses box */}
    <div className="category-box total-expense">
      <h3>Total Expenses</h3>
      <p>${totalExpenses.toFixed(2)}</p>
    </div>
  </div>
</div>


      {/* Expense Table Wrapper for Responsiveness */}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>
                  <Link to={`/edit/${expense.id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="Delete"
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;

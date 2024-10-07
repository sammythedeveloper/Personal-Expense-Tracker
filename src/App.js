import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpense from "./components/Pages/AddExpense/AddExpense";
import ExpenseList from "./components/Pages/ExpenseList/ExpenseList";
import EditExpense from "./components/Pages/EditExpense/EditExpense";
import Header from "./components/Header/Header";
import Home from "./components/Pages/HomePage/Home";
// import ExpenseChart from "./components/Pages/ExpenseList/ExpenseChart/ExpenseChart";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(savedExpenses);
  }, []);

  const addExpense = (expense) => {
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const saveEditedExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setEditingExpense(null); // Reset editing state
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route
          path="/add-expense"
          element={
            <div>
              <h2>Add Expense</h2>
              <AddExpense addExpense={addExpense} />
              <button>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >Home</Link>
              </button>
            </div>
          }
        />
        <Route
          path="/list"
          element={
            <div>
              <h2>Expense List</h2>
              {/* <div className="chart-container">
                <ExpenseChart expenses={expenses} />
              </div> */}
              <ExpenseList
                expenses={expenses}
                startEditExpense={setEditingExpense}
                deleteExpense={deleteExpense}
              />
            </div>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditExpense
              expenses={expenses}
              saveEditedExpense={saveEditedExpense}
              setEditingExpense={setEditingExpense}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

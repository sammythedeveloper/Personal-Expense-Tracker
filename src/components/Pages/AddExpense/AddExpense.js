import React, { useState, useEffect } from "react";

const categories = [
  "Food",
  "Transport",
  "Grocery",
  "Shopping",
  "Bills",
  "Other",
];

const AddExpense = ({ addExpense, editingExpense, saveEditedExpense }) => {
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  useEffect(() => {
    if (editingExpense) {
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setAmount(editingExpense.amount);
    } else {
      setCategory(categories[0]);
      setDate("");
      setAmount("");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled and amount is positive
    if (!date || !amount) {
      setErrorMessage("Both date and amount are required.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      setErrorMessage("Amount must be a positive number."); // Check if amount is positive
      return;
    }

    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(),
      category,
      date,
      amount: parseFloat(amount),
    };

    if (editingExpense) {
      saveEditedExpense(newExpense);
    } else {
      addExpense(newExpense);
      setSuccessMessage("Expense successfully added!");
      setCategory(categories[0]); 
      setDate("");
      setAmount("");
    }

    setErrorMessage(""); // Clear error message if successful
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Category:</label>
              </td>
              <td>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Amount:</label>
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">
          {editingExpense ? "Save Changes" : "Add Expense"}
        </button>
      </form>

      {/* Display error message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Display success message */}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default AddExpense;

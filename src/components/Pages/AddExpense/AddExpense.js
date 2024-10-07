import React, { useState, useEffect } from "react";

// Here I defined the available expense categories
const categories = [
  "Food",
  "Transport",
  "Grocery",
  "Shopping",
  "Bills",
  "Other",
];

// Here I created the AddExpense component, which receives addExpense, editingExpense, and saveEditedExpense as props
const AddExpense = ({ addExpense, editingExpense, saveEditedExpense }) => {
  // Here I set up state variables to manage the category, date, amount, and success message
  const [category, setCategory] = useState(categories[0]); // Here I initialized the category with the first category
  const [date, setDate] = useState(""); // Here I initialized the date as an empty string
  const [amount, setAmount] = useState(""); // Here I initialized the amount as an empty string
  const [successMessage, setSuccessMessage] = useState(""); // Here I created state for the success message

  // Here I used the useEffect hook to handle when editingExpense changes
  useEffect(() => {
    if (editingExpense) {
      // Here I check if an expense is being edited and set the state with its values
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setAmount(editingExpense.amount);
    } else {
      // Here I reset the state to default values if not editing
      setCategory(categories[0]); // Here I reset to the first category
      setDate(""); // Here I reset the date
      setAmount(""); // Here I reset the amount
    }
  }, [editingExpense]); // Here I specified that this effect runs only when editingExpense changes

  // Here I handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Here I prevent the default form submission behavior

    // Here I check if required fields are filled
    if (!date || !amount) {
      alert("Date and amount are required"); // Here I alert if fields are empty
      return; // Here I exit the function early
    }

    // Here I created a new expense object
    const newExpense = {
      id: editingExpense ? editingExpense.id : Date.now(), // Here I use the existing ID if editing; otherwise, I generate a new ID
      category, // Here I use the selected category
      date, // Here I use the entered date
      amount: parseFloat(amount), // Here I convert the amount to a number
    };

    // Here I check if I'm editing an existing expense
    if (editingExpense) {
      saveEditedExpense(newExpense); // Here I call the function to save the edited expense
    } else {
      addExpense(newExpense); // Here I call the function to add a new expense
      setSuccessMessage("Expense successfully added!"); // Here I set the success message
    }

    // Here I clear the success message after 2 seconds
    setTimeout(() => {
      setSuccessMessage(""); // Here I reset the success message
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
                  {/* Here I mapped over categories to create options for the dropdown */}
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
                  onChange={(e) => setDate(e.target.value)} // Here I updated the date state on change
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
                  onChange={(e) => setAmount(e.target.value)} // Here I updated the amount state on change
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">
          {editingExpense ? "Save Changes" : "Add Expense"} {/* Here I changed the button text based on editing mode */}
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Here I displayed the success message if available */}
    </div>
  );
};

export default AddExpense;

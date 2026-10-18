
import { useState, useEffect } from "react"
import Header from "../components/header.jsx"
import ExpenseItem from "../components/ExpenseItem.jsx"

function summation(expenseList) {
  let total = 0

  for (let i = 0; i < expenseList.length; i++) {
    total += expenseList[i].amount
  }

  return total
}

function Transactions() {
  const [expenseName, setExpenseName] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const [editingId, setEditingId] = useState(null)

  const [expenseList, setExpenseList] = useState(() => {
    const savedExpenses = localStorage.getItem("expense")

    if (savedExpenses !== null) {
      return JSON.parse(savedExpenses)
    }

    return [
      { id: 1, name: "Food", amount: 500 },
      { id: 2, name: "Transport", amount: 300 },
      { id: 3, name: "Entertainment", amount: 200 },
      { id: 4, name: "Utilities", amount: 400 },
      { id: 5, name: "Miscellaneous", amount: 600 }
    ]
  })

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenseList))
  }, [expenseList])

  function getNextId(list) {
    let maxId = 0

    for (let i = 0; i < list.length; i++) {
      if (list[i].id > maxId) {
        maxId = list[i].id
      }
    }

    return maxId + 1
  }

  function handleAddExpense(event) {
    event.preventDefault()

    if (
      !expenseName.trim() ||
      Number(expenseAmount) <= 0 ||
      isNaN(Number(expenseAmount))
    ) {
      alert("Please enter a valid expense name and amount")
      return
    }

    if (editingId === null) {
      setExpenseList(prev => [
        ...prev,
        {
          id: getNextId(prev),
          name: expenseName.trim(),
          amount: Number(expenseAmount)
        }
      ])
    } else {
      setExpenseList(prev => {
        let updatedList = []

        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id === editingId) {
            updatedList.push({
              id: prev[i].id,
              name: expenseName.trim(),
              amount: Number(expenseAmount)
            })
          } else {
            updatedList.push(prev[i])
          }
        }

        return updatedList
      })
    }

    setExpenseName("")
    setExpenseAmount("")
    setEditingId(null)
  }

  function handleDeleteExpense(id) {
    setExpenseList(prev =>
      prev.filter(expense => expense.id !== id)
    )
  }

  function handleEditExpense(id) {
    let selectedExpense

    for (let i = 0; i < expenseList.length; i++) {
      if (expenseList[i].id === id) {
        selectedExpense = expenseList[i]
        break
      }
    }

    if (selectedExpense) {
      setExpenseName(selectedExpense.name)
      setExpenseAmount(String(selectedExpense.amount))
      setEditingId(id)
    }
  }

  return (
    <div>
        <Header name={"Vishal"} lastName={"Sharma"} />
      <h1>Transactions</h1>
      <p>Manage your income and expenses.</p>

      <h2>Add an Expense</h2>

      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Enter expense name"
          value={expenseName}
          onChange={event => setExpenseName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={event => setExpenseAmount(event.target.value)}
          min="0.01"
          step="0.01"
          required
        />

        <button type="submit">
          {editingId === null ? "Add Expense" : "Update Expense"}
        </button>
      </form>

      <h2>All Transactions</h2>

      {expenseList.map(expenses => (
        <ExpenseItem
          key={expenses.id}
          id={expenses.id}
          name={expenses.name}
          amount={expenses.amount}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      ))}

      <p>Expense Count: {expenseList.length}</p>
      <h3>Total Expenses: ₹{summation(expenseList)}</h3>
    </div>
  )
}

export default Transactions


import { useEffect, useState } from "react"

function Dashboard() {
  const [expenseList, setExpenseList] = useState(() => {
    const savedExpenses = localStorage.getItem("expense")
    return savedExpenses ? JSON.parse(savedExpenses) : []
  })

  useEffect(() => {
    function loadExpenses() {
      const savedExpenses = localStorage.getItem("expense")
      setExpenseList(savedExpenses ? JSON.parse(savedExpenses) : [])
    }

    window.addEventListener("storage", loadExpenses)

    return () => {
      window.removeEventListener("storage", loadExpenses)
    }
  }, [])

  let totalExpenses = 0

  for (let i = 0; i < expenseList.length; i++) {
    totalExpenses += expenseList[i].amount
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back!</p>

      <h2>Expense Overview</h2>

      <p>Total Expenses: ₹{totalExpenses}</p>
      <p>Total Transactions: {expenseList.length}</p>

      <h2>Recent Transactions</h2>

      {expenseList.length === 0 ? (
        <p>No expenses yet. Add your first transaction!</p>
      ) : (
        expenseList.slice(-5).reverse().map(expense => (
          <p key={expense.id}>
            {expense.name} — ₹{expense.amount}
          </p>
        ))
      )}
    </div>
  )
}

export default Dashboard

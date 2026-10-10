import {useState} from "react"
function Header({name, lastName, Expense}) {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Hello {name} {lastName}!</p>
      <p>Expense: {Expense}</p>
    </div>
  )
}

function ExpenseItem({id, name, amount, onDelete}) {
  return (
    <div>
      <p>ID={id}, Name={name}, Amount={amount}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

function summation(expenseList) {
  let total = 0
  for(let i=0; i<expenseList.length; i++) {
    total += expenseList[i].amount
  }
  return total
}

function App() {
  const [expenseName, setExpenseName] = useState("")
  const [expenseAmount, setExpenseAmount] = useState("")
  const firstName = "Vishal"
  const secondName = "sharma"
  const expense = 2000
  const [expenseList, setExpenseList] = useState([
    {id: 1,name: "Food", amount: 500 },
    {id: 2,name: "Transport", amount: 300 },
    {id: 3,name: "Entertainment", amount: 200 },
    {id: 4,name: "Utilities", amount: 400 },
    {id: 5,name: "Miscellaneous", amount: 600 }
  ])

  function handleAddExpense() {
    if(!expenseName.trim() || Number(expenseAmount) <= 0 || isNaN(Number(expenseAmount))) {
      alert("Please enter both expense name and amount")
      return
    }
    setExpenseList(prev =>  [
      ...prev,
      {id: prev.length+1, name: expenseName, amount: Number(expenseAmount) }
    ] )
    setExpenseName("")
    setExpenseAmount("")
  }

  function handleDeleteExpense(id) {
    setExpenseList(prev =>
      prev.filter(expense => expense.id != id)
    )
  }

  return (
    <div>
      <Header name={firstName} lastName={secondName} Expense={expense} />
    
      {expenseList.map((expenses) => (
        <ExpenseItem 
          key = {expenses.id}
          id = {expenses.id}
          name={expenses.name} 
          amount={expenses.amount}
          onDelete={handleDeleteExpense} />
      ))}

      <p>Expense Count: {expenseList.length}</p>
      
      <br/>
      <input type="text" placeholder="Enter Expense Name" value={expenseName}
      onChange = {(event) => setExpenseName(event.target.value)}/>

      <input type="text" placeholder = "Enter the Expense Amount" value={expenseAmount} onChange = {(event) => setExpenseAmount(event.target.value)} />
      <br/>
      <button onClick= {handleAddExpense}>Add Expense</button>

      <br/>
      <p>Total Expenses: ₹{summation(expenseList)}</p>      

    </div>
  )
}

export default App
import {useState, useEffect} from "react"
function Header({name, lastName, Expense}) {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Hello {name} {lastName}!</p>
      <p>Expense: {Expense}</p>
    </div>
  )
}

function ExpenseItem({id, name, amount, onDelete, onEdit}) {
  return (
    <div>
      <p>ID={id}, Name={name}, Amount={amount}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
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

  const [seconds, setSeconds] = useState(40)
    useEffect(() => {
    const timer = setTimeout(() => {
      setSeconds(prevSeconds => prevSeconds + 1)
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  });
  const [minutes, setMinutes] = useState(59)
  useEffect(() => {
    if(seconds === 60){
      setSeconds(0)
      setMinutes(prev => prev + 1)
    }
  }, [seconds])
  const [hrs, setHrs] = useState(0)
  useEffect(() => {
    if(minutes === 60){
      setMinutes(0)
      setHrs(prev => prev + 1)
    }
  }, [minutes])
  const [editingId, setEditingId] = useState(null)
  const firstName = "Vishal"
  const secondName = "sharma"
  const expense = 2000
  const [expenseList, setExpenseList] = useState(() => {
    const savedExpenses = localStorage.getItem("expense");

    if (savedExpenses !== null){
      return JSON.parse(savedExpenses)
    }
    return [
      {id: 1,name: "Food", amount: 500 },
      {id: 2,name: "Transport", amount: 300 },
      {id: 3,name: "Entertainment", amount: 200 },
      {id: 4,name: "Utilities", amount: 400 },
      {id: 5,name: "Miscellaneous", amount: 600 }
    ]
  })
  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenseList));
  }, [expenseList]);

  function getNextid(expenseList){
    let maxId = 0
    for(let i=0 ; i<expenseList.length ; i++){
      if(expenseList[i].id > maxId){
        maxId = expenseList[i].id
      }
    }
    return maxId + 1
  }

  function handleAddExpense(event) {
    event.preventDefault()
    if(!expenseName.trim() || Number(expenseAmount) <= 0 || isNaN(Number(expenseAmount))) {
      alert("Please enter both expense name and amount")
      return
    }
    if(editingId===null){
      setExpenseList(prev =>  [
        ...prev,
        {id: getNextid(prev), name: expenseName, amount: Number(expenseAmount) }
      ] )
    } else {
      setExpenseList(prev => {
        let updatedList = []
        for(let i=0 ; i<prev.length ; i++){
          if(prev[i].id === editingId){
            updatedList.push({id: prev[i].id, name: expenseName, amount: Number(expenseAmount)})
          }else{
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
      <Header name={firstName} lastName={secondName} Expense={expense} />
    
      {expenseList.map((expenses) => (
        <ExpenseItem 
          key = {expenses.id}
          id = {expenses.id}
          name={expenses.name} 
          amount={expenses.amount}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense} />
      ))}

      <p>Expense Count: {expenseList.length}</p>
      
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Enter Expense Name"
          value={expenseName}
          onChange={(event) => setExpenseName(event.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Enter the Expense Amount"
          value={expenseAmount}
          onChange={(event) => setExpenseAmount(event.target.value)}
          required
        />

        <button type="submit">
          {editingId === null ? "Add Expense" : "Update Expense"}
        </button>
      </form>

      <br/>
      <p>Total Expenses: ₹{summation(expenseList)}</p>   
      <p>{hrs}:{minutes}:{seconds}</p>
   

    </div>
  )
}

export default App
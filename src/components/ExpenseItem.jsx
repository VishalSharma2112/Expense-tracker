function ExpenseItem({id, name, amount, onDelete, onEdit}) {
  return (
    <div>
      <p>ID={id}, Name={name}, Amount={amount}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  )
}

export default ExpenseItem
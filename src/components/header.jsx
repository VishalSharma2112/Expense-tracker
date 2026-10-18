
function Header({ name, lastName, Expense }) {
  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Hello {name} {lastName}!</p>
      <p>Expense: {Expense}</p>
    </div>
  )
}

export default Header

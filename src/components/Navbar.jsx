
import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="brand">PennyWise</h2>

      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/savings">Savings Goals</NavLink>
      </div>
    </nav>
  )
}

export default Navbar

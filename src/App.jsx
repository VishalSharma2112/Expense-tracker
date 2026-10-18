
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Dashboard from "./pages/Dashboard.jsx"
import Transactions from "./pages/Transactions.jsx"
import SavingsGoals from "./pages/SavingsGoals.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/savings" element={<SavingsGoals />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

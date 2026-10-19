
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Dashboard from "./pages/Dashboard.jsx"
import Transactions from "./pages/Transactions.jsx"
import SavingsGoals from "./pages/SavingsGoals.jsx"
import Navbar from "./components/Navbar.jsx"

function App() {

    return (
      <BrowserRouter>
        <Navbar />

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/savings" element={<SavingsGoals />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    )
  }

export default App

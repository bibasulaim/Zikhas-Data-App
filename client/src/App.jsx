import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Airtime from "./pages/Airtime";
import Data from "./pages/Data";
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";
import CableTV from "./pages/CableTV";
import Electricity from "./pages/Electricity";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTransactions from "./pages/AdminTransactions";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="/airtime" element={<Airtime />} />

        <Route path="/data" element={<Data />} />

        <Route path="/wallet" element={<Wallet />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/cable-tv" element={<CableTV />} />

<Route
  path="/admin/transactions"
  element={
    <AdminRoute>
      <AdminTransactions />
    </AdminRoute>
  }
/>
        <Route path="/electricity" element={<Electricity />} />
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
</Routes>
    </BrowserRouter>
  );
}

export default App;

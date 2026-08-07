import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import UserSidebar from "../components/UserSidebar";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [balance, setBalance] = useState(
    user?.walletBalance || 0
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await api.get(
          `/wallet/balance/${user.id || user._id}`
        );

        if (res.data.success) {
          setBalance(res.data.walletBalance);

          const updatedUser = {
            ...user,
            walletBalance: res.data.walletBalance,
          };

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );
        }
      } catch (error) {
        console.log("Balance error:", error);
      }
    };

    if (user) {
      getBalance();
    }
  }, []);

  return (
    <div className="dashboard-page">

      {/* User Sidebar */}
      <UserSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="dashboard">

        {/* Top Bar */}
        <div className="topbar">

          <div>
            <h1>Zikhas Data 💙</h1>

            <p>
              Welcome back 👋{" "}
              <strong>
                {user?.username || "User"}
              </strong>
            </p>
          </div>

          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>

        </div>


        {/* Wallet */}
        <div className="wallet-card">

          <h3>Wallet Balance</h3>

          <h1>
            ₦{Number(balance).toLocaleString()}
          </h1>

          <button
            onClick={() => navigate("/wallet")}
          >
            + Fund Wallet
          </button>

        </div>


        {/* Quick Services */}
        <h3 className="section-title">
          Quick Services
        </h3>

        <div className="service-grid">

          <div
            className="service-card"
            onClick={() => navigate("/data")}
          >
            <span>📶</span>
            <h4>Data</h4>
            <p>Buy internet data</p>
          </div>


          <div
            className="service-card"
            onClick={() => navigate("/airtime")}
          >
            <span>📱</span>
            <h4>Airtime</h4>
            <p>Recharge your line</p>
          </div>


          <div
            className="service-card"
            onClick={() => navigate("/cable-tv")}
          >
            <span>📺</span>
            <h4>Cable TV</h4>
            <p>Pay your TV subscription</p>
          </div>


          <div
            className="service-card"
            onClick={() => navigate("/electricity")}
          >
            <span>⚡</span>
            <h4>Electricity</h4>
            <p>Pay electricity bills</p>
          </div>

        </div>


        {/* Transactions */}
        <div className="transactions-card">

          <h3>Recent Transactions</h3>

          <p>
            View your latest wallet and
            service transactions.
          </p>

          <button
            onClick={() => navigate("/transactions")}
          >
            View Transactions →
          </button>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;

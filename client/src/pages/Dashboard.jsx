import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [balance, setBalance] = useState(
    user?.walletBalance || 0
  );

  useEffect(() => {
    const getBalance = async () => {
      try {
        const res = await api.get(`/wallet/balance/${user.id || user._id}`);

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
    <div className="dashboard">

      <h1>💙 Zikhas Data</h1>

      <p>
        Welcome back 👋 {user?.username || "User"}
      </p>


      <div className="wallet-card">

        <h3>Wallet Balance</h3>

        <h2>
          ₦{balance}
        </h2>


        <button onClick={() => navigate("/wallet")}>
          Fund Wallet
        </button>

      </div>


      <h3>Quick Services</h3>


      <div className="services">

        <div
          className="service"
          onClick={() => navigate("/data")}
        >
          📶
          <br />
          Data
        </div>


        <div
          className="service"
          onClick={() => navigate("/airtime")}
        >
          📱
          <br />
          Airtime
        </div>


        <div
          className="service"
          onClick={() => navigate("/cable-tv")}
        >
          📺
          <br />
          Cable TV
        </div>


        <div
          className="service"
          onClick={() => navigate("/electricity")}
        >
          ⚡
          <br />
          Electricity
        </div>

      </div>


      <h3>Recent Transactions</h3>


      <div
        className="service"
        onClick={() => navigate("/transactions")}
      >
        📜
        <br />
        View Transactions
      </div>


    </div>
  );
}

export default Dashboard;

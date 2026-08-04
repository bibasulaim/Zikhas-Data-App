import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <h1>💙 Zikhas Data</h1>

      <p>
        Welcome back 👋 {user?.username || "User"}
      </p>

      <div className="wallet-card">
        <h3>Wallet Balance</h3>
        <h2>
          ₦{user?.walletBalance ?? 0}
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

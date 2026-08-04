import "./Dashboard.css";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">
      <h1>💙 Zikhas Data</h1>
      <p>Welcome back 👋 {user?.username || "User"}</p>

      <div className="wallet-card">
        <h3>Wallet Balance</h3>
        <h2>₦{user?.walletBalance ?? 0}</h2>

        <button>Fund Wallet</button>
      </div>

      <h3>Quick Services</h3>

      <div className="services">
        <div className="service">📶<br />Data</div>
        <div className="service">📱<br />Airtime</div>
        <div className="service">📺<br />Cable TV</div>
        <div className="service">⚡<br />Electricity</div>
      </div>

      <h3>Recent Transactions</h3>

      <p>No transactions yet.</p>
    </div>
  );
}

export default Dashboard;

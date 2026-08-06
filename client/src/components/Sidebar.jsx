import {
  FaTachometerAlt,
  FaUsers,
  FaWallet,
  FaExchangeAlt,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#0f172a",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Zikhas Admin</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div><FaTachometerAlt /> Dashboard</div>
        <div><FaUsers /> Users</div>
        <div><FaWallet /> Wallet</div>
        <Link
  to="/admin/transactions"
  style={{ color: "#fff", textDecoration: "none" }}
>
  <FaExchangeAlt /> Transactions
</Link>
        <div><FaChartBar /> Analytics</div>
        <div><FaCog /> Settings</div>
      </div>
    </div>
  );
}

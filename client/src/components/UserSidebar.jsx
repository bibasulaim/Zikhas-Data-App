import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWifi,
  FaMobileAlt,
  FaTv,
  FaBolt,
  FaWallet,
  FaExchangeAlt,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function UserSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`user-sidebar ${open ? "open" : ""}`}>

        <div className="sidebar-header">
          <h2>Zikhas Data 💙</h2>

          <button
            className="sidebar-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <div className="sidebar-menu">

          <button onClick={() => goTo("/dashboard")}>
            <FaHome />
            <span>Dashboard</span>
          </button>

          <button onClick={() => goTo("/data")}>
            <FaWifi />
            <span>Data</span>
          </button>

          <button onClick={() => goTo("/airtime")}>
            <FaMobileAlt />
            <span>Airtime</span>
          </button>

          <button onClick={() => goTo("/cable-tv")}>
            <FaTv />
            <span>Cable TV</span>
          </button>

          <button onClick={() => goTo("/electricity")}>
            <FaBolt />
            <span>Electricity</span>
          </button>

          <button onClick={() => goTo("/wallet")}>
            <FaWallet />
            <span>Wallet</span>
          </button>

          <button onClick={() => goTo("/transactions")}>
            <FaExchangeAlt />
            <span>Transactions</span>
          </button>

          <button onClick={() => goTo("/settings")}>
            <FaCog />
            <span>Settings</span>
          </button>

        </div>

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>
    </>
  );
}

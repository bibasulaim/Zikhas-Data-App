import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
  });

  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      const statsRes = await api.get("/admin/dashboard");
      setStats(statsRes.data.stats);

      const usersRes = await api.get("/admin/users");
      setUsers(usersRes.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fundWallet = async (userId) => {
    const amount = prompt("Enter amount to credit:");

    if (!amount) return;

    try {
      await api.post("/wallet/deposit", {
        userId,
        amount: Number(amount),
      });

      alert("Wallet funded successfully");
      loadData();
    } catch (err) {
      alert("Funding failed");
      console.error(err);
    }
  };

  const debitWallet = async (userId) => {
    const amount = prompt("Enter amount to debit:");

    if (!amount) return;

    try {
      await api.post("/wallet/withdraw", {
        userId,
        amount: Number(amount),
      });

      alert("Wallet debited successfully");
      loadData();
    } catch (err) {
      alert("Debit failed");
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1>Zikhas Admin Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Users</h3>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Transactions</h3>
          <h1>{stats.totalTransactions}</h1>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Registered Users</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#0f172a", color: "#fff" }}>
            <th>Username</th>
            <th>Email</th>
            <th>Wallet</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>₦{user.walletBalance}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => fundWallet(user._id)}
                  style={{
                    marginRight: "8px",
                    background: "green",
                    color: "#fff",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  Credit
                </button>

                <button
                  onClick={() => debitWallet(user._id)}
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  Debit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import api from "../services/api";
import AdminLayout from "../components/AdminLayout";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const res = await api.get("/transactions");
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error(err);
      }
    };

    loadTransactions();
  }, []);

  return (
    <AdminLayout>
      <h1>Transactions</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#0f172a", color: "#fff" }}>
            <th style={{ padding: "10px" }}>User</th>
            <th style={{ padding: "10px" }}>Type</th>
            <th style={{ padding: "10px" }}>Amount</th>
            <th style={{ padding: "10px" }}>Status</th>
            <th style={{ padding: "10px" }}>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {tx.userId?.username}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {tx.type}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ₦{tx.amount}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {tx.status}
              </td>

              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(tx.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

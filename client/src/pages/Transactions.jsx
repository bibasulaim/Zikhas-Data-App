import { useEffect, useState } from "react";
import api from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function loadTransactions() {
      try {
        const response = await api.get(
          `/transactions/${user.id}`
        );

        setTransactions(response.data.transactions);
      } catch (error) {
        console.log(error);
      }
    }

    if (user) {
      loadTransactions();
    }
  }, []);

  return (
    <div className="app">
      <h1>Transactions</h1>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{transaction.type}</h3>
            <p>Amount: ₦{transaction.amount}</p>
            <p>Status: {transaction.status}</p>
            <p>
              Date:{" "}
              {new Date(transaction.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;

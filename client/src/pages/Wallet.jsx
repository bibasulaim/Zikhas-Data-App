import { useState } from "react";
import api from "../services/api";

function Wallet() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(user?.walletBalance || 0);
  const [message, setMessage] = useState("");

  const fundWallet = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/wallet/deposit", {
        userId: user.id || user._id,
        amount: Number(amount),
      });

      setBalance(res.data.walletBalance);
      setMessage("Wallet funded successfully 🎉");
      setAmount("");

      const updatedUser = {
        ...user,
        walletBalance: res.data.walletBalance,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Wallet funding failed"
      );
    }
  };

  return (
    <div>
      <h1>💰 Wallet</h1>

      <h2>
        Balance: ₦{balance}
      </h2>

      <form onSubmit={fundWallet}>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          Fund Wallet
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default Wallet;

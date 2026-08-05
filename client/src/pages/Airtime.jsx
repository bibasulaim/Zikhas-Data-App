import { useState } from "react";
import api from "../services/api";

function Airtime() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("MTN");
  const [amount, setAmount] = useState("");

  async function buyAirtime() {
    if (!phone || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/vtu/airtime", {
        userId: user.id,
        phone,
        network,
        amount: Number(amount),
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          walletBalance: response.data.walletBalance,
        })
      );

      alert("Airtime purchase successful!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Airtime purchase failed"
      );
    }
  }

  return (
    <div className="app">
      <h1>Buy Airtime</h1>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br />
      <br />

      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
      >
        <option>MTN</option>
        <option>Airtel</option>
        <option>Glo</option>
        <option>9mobile</option>
      </select>

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <button onClick={buyAirtime}>
        Buy Airtime
      </button>
    </div>
  );
}

export default Airtime;

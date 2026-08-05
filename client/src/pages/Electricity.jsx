import { useState } from "react";
import api from "../services/api";

function Electricity() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [disco, setDisco] = useState("IKEDC");
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState("Prepaid");
  const [amount, setAmount] = useState("");

  async function payElectricity() {
    if (!meterNumber || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await api.post("/vtu/electricity", {
        userId: user.id,
        disco,
        meterNumber,
        meterType,
        amount: Number(amount),
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          walletBalance: response.data.walletBalance,
        })
      );

      alert("Electricity payment successful!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Electricity payment failed"
      );
    }
  }

  return (
    <div className="app">
      <h1>⚡ Electricity Payment</h1>

      <select
        value={disco}
        onChange={(e) => setDisco(e.target.value)}
      >
        <option>IKEDC</option>
        <option>EKEDC</option>
        <option>KEDCO</option>
        <option>AEDC</option>
        <option>IBEDC</option>
        <option>PHED</option>
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Meter Number"
        value={meterNumber}
        onChange={(e) => setMeterNumber(e.target.value)}
      />

      <br /><br />

      <select
        value={meterType}
        onChange={(e) => setMeterType(e.target.value)}
      >
        <option>Prepaid</option>
        <option>Postpaid</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={payElectricity}>
        Pay Electricity Bill
      </button>
    </div>
  );
}

export default Electricity;

import { useState } from "react";
import api from "../services/api";

function Data() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("MTN");
  const [plan, setPlan] = useState("500MB");
  const [amount, setAmount] = useState(300);

  async function buyData() {
    if (!phone) {
      alert("Please enter phone number");
      return;
    }

    try {
      const response = await api.post("/vtu/data", {
        userId: user.id,
        phone,
        network,
        plan,
        amount,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          walletBalance: response.data.walletBalance,
        })
      );

      alert("Data purchase successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  }

  function changePlan(value) {
    setPlan(value);

    switch (value) {
      case "500MB":
        setAmount(300);
        break;
      case "1GB":
        setAmount(500);
        break;
      case "2GB":
        setAmount(1000);
        break;
      default:
        setAmount(300);
    }
  }

  return (
    <div className="app">
      <h1>Buy Data</h1>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <select
        value={network}
        onChange={(e) => setNetwork(e.target.value)}
      >
        <option>MTN</option>
        <option>Airtel</option>
        <option>Glo</option>
        <option>9mobile</option>
      </select>

      <br /><br />

      <select
        value={plan}
        onChange={(e) => changePlan(e.target.value)}
      >
        <option>500MB</option>
        <option>1GB</option>
        <option>2GB</option>
      </select>

      <br /><br />

      <h3>Amount: ₦{amount}</h3>

      <button onClick={buyData}>
        Buy Data
      </button>
    </div>
  );
}

export default Data;

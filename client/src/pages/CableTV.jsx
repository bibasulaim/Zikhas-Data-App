import { useState } from "react";
import api from "../services/api";

function CableTV() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [provider, setProvider] = useState("DStv");
  const [smartCard, setSmartCard] = useState("");
  const [bouquet, setBouquet] = useState("DStv Padi");
  const [amount, setAmount] = useState(3600);

  function changeBouquet(value) {
    setBouquet(value);

    switch (value) {
      case "DStv Padi":
        setAmount(3600);
        break;
      case "DStv Yanga":
        setAmount(5100);
        break;
      case "GOtv Jinja":
        setAmount(3300);
        break;
      case "GOtv Max":
        setAmount(7200);
        break;
      case "Startimes Basic":
        setAmount(3000);
        break;
      default:
        setAmount(3600);
    }
  }

  async function payCable() {
    if (!smartCard) {
      alert("Enter Smart Card Number");
      return;
    }

    try {
      const response = await api.post("/vtu/cable", {
        userId: user.id,
        provider,
        smartCard,
        bouquet,
        amount,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          walletBalance: response.data.walletBalance,
        })
      );

      alert("Cable TV subscription successful!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Subscription failed"
      );
    }
  }

  return (
    <div className="app">
      <h1>📺 Cable TV Subscription</h1>

      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
      >
        <option>DStv</option>
        <option>GOtv</option>
        <option>Startimes</option>
      </select>

      <br /><br />

      <input
        type="text"
        placeholder="Smart Card Number"
        value={smartCard}
        onChange={(e) => setSmartCard(e.target.value)}
      />

      <br /><br />

      <select
        value={bouquet}
        onChange={(e) => changeBouquet(e.target.value)}
      >
        <option>DStv Padi</option>
        <option>DStv Yanga</option>
        <option>GOtv Jinja</option>
        <option>GOtv Max</option>
        <option>Startimes Basic</option>
      </select>

      <br /><br />

      <h3>Amount: ₦{amount}</h3>

      <button onClick={payCable}>
        Subscribe
      </button>
    </div>
  );
}

export default CableTV;

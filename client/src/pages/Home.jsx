import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">
      <h1>💙 Zikhas Data</h1>
      <p>Fast • Reliable • Affordable</p>

      <h2>Welcome 👋</h2>

      <div>
        <h3>Wallet Balance</h3>
        <p>₦0.00</p>
      </div>

      <br />

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;

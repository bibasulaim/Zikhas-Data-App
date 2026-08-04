import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("token", response.data.token);
localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");

      // Go to Dashboard
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login failed! Check your email and password."
      );
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="app">
      <h1>💙 Zikhas Data</h1>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    // try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    // } catch (err) {
    //   alert("Invalid credentials");
    // }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;

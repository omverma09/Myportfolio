import { useState } from "react";
import axios from "axios";
import server from "../environment";

export default function Loginform () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formHamdler = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${server}/api/admin/login`, {email, password});
            localStorage.setItem("adminToken", res.data.token);
            alert("Login successfully...");
            window.location.reload();
        } catch (error) {
            alert(error);
        }

    }

  return (
    <div className="container mt-4">
      <h4>Admin Login</h4>

      <form onSubmit={formHamdler}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};
import React, { useState } from "react";
import Loginform from "./Loginform";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const token = localStorage.getItem("adminToken");

  const logoutHandler = () => {
    localStorage.removeItem("adminToken");
    alert("You Logout");
    window.location.reload();
  };

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark px-4 py-3">
        <span className="navbar-brand fs-4 fw-bold text-light">
          <b>Om verma</b>
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-4 fs-6 align-items-center">
            <li className="nav-item nav-link-custom" >
              <NavLink to="/" className="navbar">Home</NavLink>
            </li>

            <li className="nav-item nav-link-custom" >
              <NavLink to="/about" className="navbar" >About</NavLink>
            </li>

            <li className="nav-item nav-link-custom">
              <NavLink to="/project" className="navbar" >Projects</NavLink>
            </li>

            <li className="nav-item nav-link-custom" >
              <NavLink to="/contact" className="navbar" >Contact</NavLink>
            </li>

            {token ? (
              <button
                className="btn btn-primary"
                style={{ padding: "5px 10px" }}
                onClick={logoutHandler}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{ padding: "5px 10px" }}
                onClick={() => setShowLogin(!showLogin)}
              >
                Login
              </button>
            )}
          </ul>
        </div>

        {!token && showLogin && <Loginform />}
      </nav>
    </>
  ); 
}

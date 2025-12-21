import React from "react";
import profile from "../assets/myphoto.png"; // apni image laga dena

export default function Hero() {
  return (
    <div className="container-fluid  text-light py-1" style={{ minHeight: "100vh" }}>
      <div className="row align-items-center">

        <div className="col-md-6 ps-5" style={{ marginTop: "10px" }}>
          <h2 className="fw-bold">Hello...</h2>
          <h1 className="display-4 fw-bold">I’m Om</h1>
          <h1 className="display-5 fw-bold text-warning">Software Developer</h1>

          <div class="button-container">
            <button class="btn btn-primary">Got a project?</button>
            <button class="btn btn-outline">My resume</button>
          </div>
        </div>

        <div className="col-md-6 text-center py-4">
          <img
            src={profile}
            className="img-fluid rounded-circle border border-danger p-2"
            style={{ width: "320px" }}
            alt="profile"
          />
        </div>

      </div>
    </div>
  );
}

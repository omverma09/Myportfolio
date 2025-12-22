import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Addproject from "./Addproject"
import { Card } from "react-bootstrap";
import server from '../environment';

export default function Project() {
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("adminToken");

  const [projects, setProject] = useState([]);

  useEffect(() => {
    axios.get(`${server}/api/project/get-project`)
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      })

  }, [])

  return (
    <section className="py-5" style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="text-center display-3 fw-bold mb-4 fs-2">Projects</h1>
        <div className="d-flex justify-content-center mb-5">
          <div style={{ width: '60px', height: '4px', backgroundColor: '#ff6b61' }} />
        </div>

        {projects.map((project, index) => (
          <div className="row align-items-center my-5 g-5" key={index}>
            {/* Alternate order: odd index -> image left, even -> image right */}
            {index % 2 === 0 ? (
              <>
                <div className="col-lg-6">
                  <img src={project.image} alt={project.title} className="img-fluid rounded shadow-lg" style={{ maxHeight: '500px', objectFit: 'contain' }} />
                </div>
                <div className="col-lg-6">
                  <h2 className="display-5 fw-bold mb-3 fs-2">{project.title}</h2>
                  <div className="mb-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="badge bg-secondary text-white me-2 py-2 px-3">{t}</span>
                    ))}
                  </div>
                  <p className="lead text-light">{project.desc}</p>
                  <div className="mt-4">
                    <a href={project.github} className="btn text-white me-3 px-4 py-2" style={{ backgroundColor: '#ff6b61' }}>View Github</a>
                    <a href={project.live} className="text-white text-decoration-none fw-bold">View project →</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-lg-6 order-lg-2">
                  <img src={project.image} alt={project.title} className="img-fluid rounded shadow-lg" style={{ maxHeight: '400px', objectFit: 'contain' }} />
                </div>
                <div className="col-lg-6 order-lg-1">
                  <h2 className="display-5 fw-bold mb-3 fs-2">{project.title}</h2>
                  <div className="mb-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="badge bg-secondary text-white me-2 py-2 px-3">{t}</span>
                    ))}
                  </div>
                  <p className="lead text-light">{project.desc}</p>
                  <div className="mt-4">
                    <a href={project.github} className="btn text-white me-3 px-4 py-2" style={{ backgroundColor: '#ff6b61' }}>View Github</a>
                    <a href={project.live} className="text-white text-decoration-none fw-bold">View project →</a>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Token validation. */}
      {
        token ? <Card
          className="text-center p-3"
          style={{
            background: "#111315",
            color: "white",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
          }}
          onClick={() => setShowForm(!showForm)}
        >+</Card> : <></>
      }
      {token && showForm && <Addproject/>}
    </section>
  );
}
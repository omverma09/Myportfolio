import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Addskills from "./Addskills.jsx";


export default function Skill() {
  const token = localStorage.getItem("adminToken");
  const [showForm, setShowForm] = useState(false);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/skill/get-Skills").then((res) => {
      setSkills(res.data);
    }).catch((err) => {
      console.log(err.message);
    })
  },[]);

  return (
    <section style={{ background: "#0d0f12", padding: "60px 0" }}>
      <Container>
        {/* Heading */}
        <h2
          className="text-center mb-3 fs-2"
          style={{ color: "white", fontWeight: "700", fontSize: "42px" }}
        >
          What I do
        </h2>
        <div className="d-flex justify-content-center mb-5">
          <div style={{ width: '60px', height: '4px', backgroundColor: '#ff6b61' }} />
        </div>

        {/* Description */}
        <p
          className="text-center mx-auto mb-5"
          style={{
            color: "#d3d3d3",
            maxWidth: "800px",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          I am a passionate developer who loves building clean UI, modern web
          applications and scalable backend systems. Below are the technologies
          I work with.
        </p>

        {/* Skills Grid */}
        <Row className="justify-content-center g-4 mt-4">
          {skills.map((skill, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2}>
              <Card
                className="text-center p-3"
                style={{
                  background: "#111315",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{ width: "50px", margin: "0 auto" }}
                />
                <p
                  className="mt-3 mb-0"
                  style={{ color: "white", fontWeight: "500" }}
                >
                  {skill.name}
                </p>
              </Card> 
            </Col>
          ))}
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
        </Row>
       
      </Container>
      {token && showForm && <Addskills />}
    </section>
  );
}

import React from "react";
import { Container, Row, Col } from "react-bootstrap";


export default function About(){
  return (
    <section className="about-section py-5">
      <Container>
        <Row className="align-items-center">

          {/* LEFT SIDE SERVICES */}
          <Col md={5}>
            <div className="services-list">
              <div className="service-item d-flex align-items-center mb-5">
                <div className="line-dot"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1828/1828961.png"
                  alt="dev"
                  className="service-icon"
                />
                <h5 className="ms-3">Website Development</h5>
              </div>

              <div className="service-item d-flex align-items-center mb-5">
                <div className="line-dot"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3094/3094893.png"
                  alt="app"
                  className="service-icon"
                />
                <h5 className="ms-3">App Development</h5>
              </div>

              <div className="service-item d-flex align-items-center">
                <div className="line-dot"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1048/1048949.png"
                  alt="hosting"
                  className="service-icon"
                />
                <h5 className="ms-3">Website Hosting</h5>
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE ABOUT */}
          <Col md={7}>
            <h2 className="about-title mb-3 fs-2">About me</h2>
            <div style={{ width: '100px', height: '3px', backgroundColor: '#ff6b61' }} />
            <p className="about-text mb-4">
              Hello, I'm Om verma, dedicated full-stack developer crafting user-focused solutions.
              Expert in React, Node.js, and creating seamless digital experiences.
              Let's collaborate on projects that make a difference.
            </p>

            <Row className="stats-row">
              <Col xs={4}>
                <h3 className="stat-number">
                  5 <span className="plus">+</span>
                </h3>
                <p className="stat-label">Completed Projects</p>
              </Col>

              <Col xs={4}>
                <h3 className="stat-number">
                  95 <span className="plus">%</span>
                </h3>
                <p className="stat-label">Communication</p>
              </Col>

              <Col xs={4}>
                <h3 className="stat-number">
                  Fresher <span className="plus">+</span>
                </h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

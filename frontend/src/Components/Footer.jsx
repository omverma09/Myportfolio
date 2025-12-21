import { useState } from "react";
// import axios from "axios";
// import server from "../enviroment";

const Footer = () => {
  const [email, setEmail] = useState("");

  // const handleSubscribe = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(
  //       `${server}/api/subscribe/add-subscribe`,
  //       { email }
  //     );

  //     alert(res.data.message);
  //     setEmail("");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Something went wrong");
  //   }
  // };
  return (
    <>
      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-overlay">
          <div className="cta-content">
            <h3>
              Learn more about our listing process, as well as our
              additional staging and design work.
            </h3>
            <button className="cta-btn">LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* FOOTER TOP (BLUE STRIP) */}
      <div className="footer-top">
        <div className="container footer-top-inner">
          <ul className="footer-links">
            <li>Home</li>
            <li>Services</li>
            <li>Projects</li>
            <li>Testimonials</li>
            <li>Contact</li>
          </ul>

          <div className="newsletter">
            <span>Subscribe Us</span>
            <form className="subscribe-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <footer className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© Real Trust 2023</p>

          <div className="social-icons">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

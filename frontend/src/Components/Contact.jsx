import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contact() {
  return (
    <section className="py-5" style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Section Title */}
        <div>
          <div className="d-flex align-items-center">
            <div style={{ width: '60px', height: '4px', backgroundColor: '#ff6b61', marginRight: '15px' }} />
            <h2 className="mb-0 fs-4 text-white">Contacts</h2>
          </div>
        </div>

        <div className="row align-items-center" style={{marginTop:"0px"}}>
          {/* Left: Heading + Button */}
          <div className="col-lg-5">
            <h1 className="display-1 fw-bold lh-1 fs-2">
              Have a project?<br />
              Let's talk!
            </h1>
            <button
              type="button"
              className="btn text-white fw-bold px-5 py-3 mt-4"
              style={{
                backgroundColor: '#ff6b61',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e55a52'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b61'}
            >
              Submit
            </button>
          </div>

          {/* Right: Contact Form */}
          <div className="col-lg-6">
            <form>
              <div className="mb-5">
                <label htmlFor="name" className="form-label text-white mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control bg-transparent text-white border-0 border-bottom border-secondary"
                  style={{ borderBottom: '2px solid #555', padding: '12px 0' }}
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label text-white mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control bg-transparent text-white border-0 border-bottom border-secondary"
                  style={{ borderBottom: '2px solid #555', padding: '12px 0' }}
                  placeholder=""
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label text-white mb-3">Message</label>
                <textarea
                  id="message"
                  rows="3"
                  className="form-control bg-transparent text-white border-0 border-bottom border-secondary"
                  style={{ borderBottom: '2px solid #555', padding: '12px 0', resize: 'none' }}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
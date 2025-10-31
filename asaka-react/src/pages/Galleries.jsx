import React from "react";
import "./Galleries.css";

export default function Galleries() {
  return (
    <div className="page-wrapper">

      <main>
        <h2>Photo Galleries</h2>
        <p>Browse a selection of past sessions and wedding moments.</p>

        <div className="gallery-grid">
          <img src="/0M4A1683.jpeg" alt="Gallery Photo 1" />
          <img src="/0M4A9515.jpeg" alt="Gallery Photo 2" />
          <img src="/1J5A5313.jpeg" alt="Gallery Photo 3" />
          <img src="/5F8AE562-B9F4-466E-8332-3BDBD61E153D.jpeg" alt="Gallery Photo 4" />
        </div>
      </main>

      <footer>© 2025 Asaka Photography — Capturing timeless moments</footer>
    </div>
  );
}

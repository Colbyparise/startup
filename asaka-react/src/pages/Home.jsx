import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">

      {/* ===== Header ===== */}
      <header className="header">
        <div className="logo">
          <span className="logo-cursive">Asaka</span> Photos
        </div>

        <nav>
          <a href="/">Home</a>
          <a href="/galleries">Portfolio</a>
          <a href="/schedule">Connect</a>
          <a href="/reviews">Reviews</a>
        </nav>
      </header>

     <main className="photo-row">
  <div className="center-text">
    <h1>Elegant. Organic. Refined.</h1>
    <h2>available worldwide</h2>
  </div>

  <img src="/0M4A3989.jpg" alt="Homephoto" className="home-photo" />
  <img src="/1J5A4634.jpg" alt="Homephoto2" className="home-photo" />
</main>

    </div>
  );
}

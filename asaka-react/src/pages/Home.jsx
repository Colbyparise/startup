import React, { useState, useEffect } from "react";

import "./Home.css";

export default function Home() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("/api/quote")
      .then((res) => res.json())
      .then((data) => setQuote(data.content))
      .catch((err) => console.error("Failed to fetch quote:", err));
}, []);


  return (

    
    <div className="home-page">

      {}
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

      <div className="github-section" style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{ fontSize: "1.1rem" }}>
          Check out my code at{" "}
          <a 
            href="https://github.com/Colbyparise/startup" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", fontWeight: "bold" }}
          >
          </a>
        </p>
      </div>


     <main className="photo-row">
  <div className="center-text">
    <h1>Elegant. Organic. Refined.</h1>
    <h2>available worldwide</h2>
  </div>

  <img src="/0M4A3989.jpg" alt="Homephoto" className="home-photo" />
  <img src="/1J5A4634.jpg" alt="Homephoto2" className="home-photo" />
</main>
    <div className="quote-container">
        <p>💡 Quote of the Day: {quote ? `"${quote}"` : "Loading..."}</p>
      </div>
    </div>
  );
}
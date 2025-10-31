import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-wrapper">

      <main>
        <h2>Wedding Photography Pricing</h2>

        <p className="intro">
          Check out my code on{" "}
          <a href="https://github.com/Colbyparise/startup" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>

        <h3>In-State Weddings</h3>

        <div className="packages">
          <div className="package">
            <h4>$2000 – 4 hours</h4>
            <ul>
              <li>300+ edited images</li>
              <li>Timeline call</li>
              <li>72-hour sneak peeks</li>
              <li>6-week turnaround</li>
            </ul>
          </div>

          <div className="package">
            <h4>$2500 – 6 hours</h4>
            <ul>
              <li>450+ edited images</li>
              <li>Bridal session</li>
              <li>72-hour sneak peeks</li>
              <li>6-week turnaround</li>
            </ul>
          </div>

          <div className="package">
            <h4>$3000 – 8 hours</h4>
            <ul>
              <li>600+ edited images</li>
              <li>Bridal + engagement</li>
              <li>72-hour sneak peeks</li>
              <li>6-week turnaround</li>
            </ul>
          </div>
        </div>

        <h3>Payment Options</h3>

        <div className="payment">
          <div className="box venmo">Venmo</div>
          <div className="box paypal">PayPal</div>
        </div>
      </main>

      <footer>© 2025 Asaka Photography. All Rights Reserved.</footer>
    </div>
  );
}

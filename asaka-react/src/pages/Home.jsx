import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home() {
  const [favorite, setFavorite] = useState(null);

  // Load saved favorite on page load
  useEffect(() => {
    const saved = localStorage.getItem("favoritePackage");
    if (saved) {
      setFavorite(saved);
    }
  }, []);

  function handleFavorite(name) {
    setFavorite(name);
    localStorage.setItem("favoritePackage", name);
  }

  const packages = [
    {
      name: "$2000 – 4 hours",
      details: ["300+ edited images", "Timeline call", "72-hour sneak peeks", "6-week turnaround"]
    },
    {
      name: "$2500 – 6 hours",
      details: ["450+ edited images", "Bridal session", "72-hour sneak peeks", "6-week turnaround"]
    },
    {
      name: "$3000 – 8 hours",
      details: ["600+ edited images", "Bridal + engagement", "72-hour sneak peeks", "6-week turnaround"]
    }
  ];

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
          {packages.map((pkg) => (
            <div className="package" key={pkg.name}>
              <h4>{pkg.name}</h4>

              <ul>
                {pkg.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <button
                className="fav-btn"
                onClick={() => handleFavorite(pkg.name)}
              >
                {favorite === pkg.name ? "★ Favorited" : "☆ Favorite"}
              </button>
            </div>
          ))}
        </div>

        {favorite && (
          <div className="favorite-display">
            <p>
              ⭐ Your favorite package is: <strong>{favorite}</strong>
            </p>
          </div>
        )}

        <h3>Payment Options</h3>

        <div className="payment">
          <div className="box venmo">Venmo</div>
          <div className="box paypal">PayPal</div>
        </div>
      </main>
      
    </div>
  );
}


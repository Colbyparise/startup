import React from "react";
import "./Reviews.css";

export default function Reviews() {
  return (
    <div className="reviews-page">

      {/* ===== Header ===== */}
      <header className="top-header">
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

      <main>
        <h2>Client Reviews</h2>

        <div className="review">
          <div className="stars">★★★★★</div>
          <h3>Emily &amp; Jordan</h3>
          <p>
            “We couldn’t be happier with our wedding photos! Asaka captured every
            little detail and emotion perfectly. The gallery brought us to tears
            all over again.”
          </p>
        </div>

        <div className="review">
          <div className="stars">★★★★★</div>
          <h3>Rachel P.</h3>
          <p>
            “Professional, friendly, and creative! Asaka made our engagement shoot
            so fun and comfortable. We’ve already recommended her to our friends.”
          </p>
        </div>

        <div className="review">
          <div className="stars">★★★★★</div>
          <h3>The Smith Family</h3>
          <p>
            “Our family portraits turned out better than we could have imagined.
            She has such a gift for working with kids and capturing natural
            smiles.”
          </p>
        </div>

        <div className="review">
          <div className="stars">★★★★☆</div>
          <h3>Michael &amp; Katie</h3>
          <p>
            “Amazing experience! The only reason I gave 4 stars is because it took
            a little longer to receive the final edits, but they were absolutely
            worth the wait.”
          </p>
        </div>
      </main>

    </div>
  );
}

import React from "react";
import "../App.css";

export default function Schedule() {
  return (
    <div>
      <main>
        <h2>Inquire Here</h2>
        <p>
          I can't wait to connect with you. Thank you so much for considering me
          as your photographer!
        </p>
        <p>Please expect a response within 1–2 business days!</p>

        <form className="schedule-form">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />

          <label htmlFor="date">Preferred Date:</label>
          <input type="date" id="date" required />

          <label htmlFor="session-type">Session Type:</label>
          <select id="session-type" required>
            <option value="">Select...</option>
            <option value="wedding">Wedding Day Photo Coverage</option>
            <option value="weekend">Wedding Weekend Photo Coverage</option>
            <option value="elopement">Elopement</option>
            <option value="engagement">Engagement Photos</option>
            <option value="bridals">Bridals (Utah only)</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="other">Other (please specify):</label>
          <input type="text" id="other" />

          <label htmlFor="message">Additional Details:</label>
          <textarea id="message" rows="4" placeholder="Tell me more..."></textarea>

          <button type="submit">Submit Request</button>
        </form>
      </main>

      <footer>&copy; 2025 Asaka Photography</footer>
    </div>
  );
}

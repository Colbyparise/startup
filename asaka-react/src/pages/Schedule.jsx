import React, { useState, useEffect } from "react";
import "../App.css";

export default function Schedule() {
  // ===== React State =====
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    type: "",
    other: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // mock server response
  const [liveMessage, setLiveMessage] = useState(null); // mock websocket
  const [savedName, setSavedName] = useState(localStorage.getItem("userName"));

  // ===== Mock WebSocket using setInterval =====
  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = `Visitor-${Math.floor(Math.random() * 1000)}`;
      setLiveMessage(`👋 ${randomUser} just viewed the Schedule page`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ===== Handle Form Changes =====
  function updateField(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  // ===== Mock Submit (simulating an API call) =====
  function submitForm(e) {
    e.preventDefault();
    localStorage.setItem("userName", formData.name);
    setSavedName(formData.name);

    // Simulated backend response
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Your request has been submitted! (mocked backend)");
    }, 1200);
  }

  return (
    <div>
      <main>
        <h2>Inquire Here</h2>

        <p>I can't wait to connect with you. Thank you so much for considering me as your photographer!</p>
        <p>Please expect a response within 1–2 business days!</p>

        {/* ===== Requirement: Name + GitHub Link ===== */}
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Developer: Colby Parise —  
          <a href="https://github.com/yourGitHubHere" target="_blank" rel="noreferrer">
            My GitHub
          </a>
        </p>

        {/* ===== Live WebSocket Mock ===== */}
        {liveMessage && (
          <div style={{ background: "#eee", padding: "10px", marginTop: "15px" }}>
            {liveMessage}
          </div>
        )}

        {/* ===== Form ===== */}
        <form className="schedule-form" onSubmit={submitForm}>
          <label htmlFor="name">Full Name:</label>
          <input id="name" value={formData.name} onChange={updateField} required />

          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={formData.email} onChange={updateField} required />

          <label htmlFor="date">Preferred Date:</label>
          <input id="date" type="date" value={formData.date} onChange={updateField} required />

          <label htmlFor="type">Session Type:</label>
          <select id="type" value={formData.type} onChange={updateField} required>
            <option value="">Select...</option>
            <option value="wedding">Wedding Day Photo Coverage</option>
            <option value="weekend">Wedding Weekend Photo Coverage</option>
            <option value="elopement">Elopement</option>
            <option value="engagement">Engagement Photos</option>
            <option value="bridals">Bridals (Utah only)</option>
            <option value="other">Other</option>
          </select>

          {formData.type === "other" && (
            <>
              <label htmlFor="other">Other (please specify):</label>
              <input id="other" value={formData.other} onChange={updateField} />
            </>
          )}

          <label htmlFor="message">Additional Details:</label>
          <textarea id="message" rows="4" value={formData.message} onChange={updateField} />

          <button type="submit">Submit Request</button>
        </form>

        {/* ===== Mock Server Response ===== */}
        {status && (
          <p style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
            {status}
          </p>
        )}

        {/* ===== LocalStorage Output ===== */}
        {savedName && (
          <p style={{ marginTop: "10px" }}>
            Welcome back, <strong>{savedName}</strong>! (Loaded from localStorage)
          </p>
        )}
      </main>
    </div>
  );
}

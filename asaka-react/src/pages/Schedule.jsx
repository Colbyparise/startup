import React, { useState, useEffect } from "react";
import "./Schedule.css";
//frontend makes Websocket connections
import { 
  getBookedDates, submitBooking,
  registerUser, loginUser, logoutUser, socket, onBookingUpdate
} from "../services/api";

function AvailabilityCalendar({ bookedDates, currentMonth, setCurrentMonth }) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push({ blank: true, key: `blank-${i}` });
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = new Date(year, month, day).toISOString().split("T")[0];
    calendarCells.push({
      blank: false,
      day,
      dateString,
      booked: bookedDates.includes(dateString),
      key: `day-${day}`
    });
  }

  return (
    <div className="calendar-container">
      <h2>📅 Availability Calendar</h2>
      <p>Days marked in <span style={{ color: "red", fontWeight: "bold" }}>red</span> are fully booked.</p>

      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>◀</button>
        <h3>{currentMonth.toLocaleString("default", { month: "long" })} {year}</h3>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>▶</button>
      </div>

      <div className="calendar-weekdays">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="calendar-grid">
        {calendarCells.map(cell =>
          cell.blank ? <div key={cell.key} className="calendar-day blank"></div> :
          <div key={cell.key} className={`calendar-day ${cell.booked ? "booked" : ""}`}>{cell.day}</div>
        )}
      </div>
    </div>
  );
}

export default function Schedule() {
  const [formData, setFormData] = useState({
    name: "", pname: "", email: "", phone: "", insta: "",
    venue: "", investment: "", referral: "", date: "",
    type: "", other: "", message: "", vision: "",
  });

  const [status, setStatus] = useState("");
  const [savedName, setSavedName] = useState(localStorage.getItem("userName") || "");
  const [bookedDates, setBookedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [authData, setAuthData] = useState({ authName: "", authEmail: "", password: "" });

  function updateAuthField(e) {
    setAuthData({ ...authData, [e.target.id]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await registerUser({
        name: authData.authName,
        email: authData.authEmail,
        password: authData.password
      });
      setUser(res.user);
    } catch {
      setAuthError("Registration failed.");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await loginUser({ email: authData.authEmail, password: authData.password });
      setUser(res.user);
    } catch {
      setAuthError("Invalid login.");
    }
  }

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  useEffect(() => {
    async function fetchDates() {
      try {
        const dates = await getBookedDates();
        setBookedDates(dates);
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    }
    fetchDates();

    // Websocket data displayed in the UI
    onBookingUpdate((updatedDates) => {
      setBookedDates(updatedDates);
    });

    return () => socket.off("bookingUpdated");
  }, []);

  function updateField(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!user) {
      setStatus("❌ You must be logged in to submit.");
      return;
    }
    if (formData.name) {
      localStorage.setItem("userName", formData.name);
      setSavedName(formData.name);
    }

    setStatus("Sending...");
    try {
      const response = await submitBooking(formData);
      setBookedDates(response.bookedDates);
      setStatus("Your request has been submitted!");
    } catch {
      setStatus("Failed to submit request.");
    }
  }

  return (
    <div className="schedule-page">
      <header className="top-header">
        <div className="logo"><span className="logo-cursive">Asaka</span> Photos</div>
        <nav>
          <a href="/">Home</a>
          <a href="/galleries">Portfolio</a>
          <a href="/schedule">Connect</a>
          <a href="/reviews">Reviews</a>
        </nav>
      </header>

      <main>
        <h2>Inquire Here</h2>
        <p>Thank you for considering me as your photographer! Expect a response within 1–2 business days.</p>

        {/* AUTH BOX */}
        {!user ? (
          <div className="auth-box">
            <h3>Login or Register</h3>
            {authError && <p className="auth-error">{authError}</p>}
            <input id="authName" placeholder="Name (register only)" value={authData.authName} onChange={updateAuthField} />
            <input id="authEmail" placeholder="Email" value={authData.authEmail} onChange={updateAuthField} />
            <input id="password" type="password" placeholder="Password" value={authData.password} onChange={updateAuthField} />
            <div className="auth-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleRegister}>Register</button>
            </div>
          </div>
        ) : (
          <div className="auth-box logged-in">
            <p>Logged in as <strong>{user.name}</strong></p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* MAIN FORM */}
        <form className="schedule-form" onSubmit={submitForm}>
          {!user && <p className="lock-message">🔒 Please login to submit this form.</p>}

          <label htmlFor="name">Full Name *</label>
          <input id="name" value={formData.name} onChange={updateField} required />
          <label htmlFor="pname">Partner's Full Name *</label>
          <input id="pname" value={formData.pname} onChange={updateField} required />
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" value={formData.email} onChange={updateField} required />
          <label htmlFor="phone">Phone Number *</label>
          <input id="phone" value={formData.phone} onChange={updateField} required />
          <label htmlFor="insta">Instagram Handle</label>
          <input id="insta" value={formData.insta} onChange={updateField} />
          <label htmlFor="type">Session Type *</label>
          <select id="type" value={formData.type} onChange={updateField} required>
            <option value="">Select...</option>
            <option value="wedding">Wedding Day Photo Coverage</option>
            <option value="weekend">Wedding Weekend Photo Coverage</option>
            <option value="elopement">Elopement</option>
            <option value="engagement">Engagement Photos</option>
            <option value="bridals">Bridals (Utah only)</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="date">Event Date *</label>
          <input id="date" type="date" value={formData.date} onChange={updateField} required />
          <label htmlFor="venue">Location & Venue *</label>
          <input id="venue" value={formData.venue} onChange={updateField} required />
          <label htmlFor="investment">Photography Investment Range *</label>
          <input id="investment" value={formData.investment} onChange={updateField} required />
          <label htmlFor="referral">How did you hear about me? *</label>
          <input id="referral" value={formData.referral} onChange={updateField} required />
          <label htmlFor="vision">Mood Board / Inspiration / Vision</label>
          <input id="vision" value={formData.vision} onChange={updateField} />

          {formData.type === "other" && (
            <>
              <label htmlFor="other">Other (please specify)</label>
              <input id="other" value={formData.other} onChange={updateField} />
            </>
          )}

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4" value={formData.message} onChange={updateField} />

          <button type="submit" disabled={!user}>Submit Request</button>
        </form>

        {status && <p className="status-message">{status}</p>}
        {savedName && <p className="welcome-message">Welcome back, <strong>{savedName}</strong>!</p>}

        <AvailabilityCalendar bookedDates={bookedDates} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </main>
    </div>
  );
}

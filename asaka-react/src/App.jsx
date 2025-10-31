import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Reviews from "./pages/Reviews";
import Galleries from "./pages/Galleries";
import "./App.css";
import "./index.css";

export default function App() {
  return (
    <Router>
      <header className="top-bar">ASAKA PHOTOGRAPHY</header>

      <nav className="navbar">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
        <NavLink to="/galleries">Galleries</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/galleries" element={<Galleries />} />
      </Routes>

      <footer>© 2025 Asaka Photography</footer>
    </Router>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Reviews from "./pages/Reviews";
import Galleries from "./pages/Galleries";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/galleries" element={<Galleries />} />
      </Routes>
    </Router>
  </StrictMode>
);

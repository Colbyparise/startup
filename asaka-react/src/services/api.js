// REST API functions
export async function getBookedDates() {
  const res = await fetch("/api/bookings");
  if (!res.ok) throw new Error("Failed to fetch booked dates");
  return res.json();
}

export async function submitBooking(formData) {
  const res = await fetch("/api/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include"
  });
  if (!res.ok) throw new Error("Failed to submit booking");
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function loginUser(data) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logoutUser() {
  const res = await fetch("/api/logout", { method: "POST" });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}


import { io } from "socket.io-client";

export const socket = io(); //connects from browser to backend 

export function onBookingUpdate(callback) {
  socket.on("bookingUpdated", callback);
}

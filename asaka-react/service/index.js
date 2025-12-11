// server.js
import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import * as DB from "./database.js";

async function startServer() {
  await DB.connectDB();

  const app = express();
  const port = process.argv[2] || 4000;
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  // WebSocket connections
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));

  // Auth middleware
  async function requireAuth(req, res, next) {
    const userId = req.cookies.session;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await DB.getUserById(userId);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  }

  // Register
  app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const existingUser = await DB.getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = bcrypt.hashSync(password, 8);
    const newUser = { id: uuidv4(), name, email, password: hashed };

    await DB.addUser(newUser);
    res.json({ success: true, user: { id: newUser.id, name: newUser.name } });
  });

  // Login
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await DB.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("session", user.id, { httpOnly: true });
    res.json({ success: true, user: { id: user.id, name: user.name } });
  });

  // Logout
  app.post("/api/logout", (req, res) => {
    res.clearCookie("session");
    res.json({ success: true });
  });

  // Create booking & emit via WebSocket
  app.post("/api/book", requireAuth, async (req, res) => {
    const { name, date } = req.body;
    if (!name || !date)
      return res.status(400).json({ error: "Missing fields" });

    const newBooking = { id: uuidv4(), userId: req.user.id, name, date };
    await DB.addBooking(newBooking);

    const allBookings = await DB.getAllBookings();
    const bookedDates = allBookings.map((b) => b.date);

    io.emit("bookingUpdated", bookedDates);

    res.json({ success: true, bookedDates });
  });

  // Get all bookings
  app.get("/api/bookings", async (_req, res) => {
    const all = await DB.getAllBookings();
    res.json(all.map((b) => b.date));
  });

  // Quote endpoint
  app.get("/api/quote", (_req, res) => {
    const quotes = [
      "Creativity takes courage.",
      "Photography is the story I fail to put into words.",
      "A picture is a poem without words.",
      "The best camera is the one you have with you.",
      "Art is not what you see, but what you make others see.",
    ];
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ content: random });
  });

  // Default page
  app.use((_req, res) => {
    res.sendFile("index.html", { root: "public" });
  });

  httpServer.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
  });
}

startServer();

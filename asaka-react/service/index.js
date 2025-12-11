import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";
import fs from "fs";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const dbConfig = JSON.parse(fs.readFileSync("dbConfig.json", "utf8"));

const uri = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}/${dbConfig.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
});

let Users;
let Bookings;

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbConfig.database);
    Users = db.collection("users");
    Bookings = db.collection("bookings");

    initExpress();
  } catch (err) {
    console.error("MongoDB connection FAILED");
    console.error(err);
    process.exit(1);
  }
}

function initExpress() {
  const app = express();
  const port = process.argv[2] || 4000;

  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }, // adjust origin for production
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static("public"));

  async function requireAuth(req, res, next) {
    const userId = req.cookies.session;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await Users.findOne({ id: userId });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
  }

  app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = bcrypt.hashSync(password, 8);
    const newUser = { id: uuidv4(), name, email, password: hashed };

    await Users.insertOne(newUser);
    res.json({ success: true, user: { id: newUser.id, name: newUser.name } });
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Invalid credentials" });

    res.cookie("session", user.id, { httpOnly: true });
    res.json({ success: true, user: { id: user.id, name: user.name } });
  });

  app.post("/api/logout", (req, res) => {
    res.clearCookie("session");
    res.json({ success: true });
  });

  // Booking endpoint now emits updates via Socket.io
  app.post("/api/book", requireAuth, async (req, res) => {
    const { name, date } = req.body;
    if (!name || !date)
      return res.status(400).json({ error: "Missing fields" });

    const newBooking = {
      id: uuidv4(),
      userId: req.user.id,
      name,
      date,
    };

    await Bookings.insertOne(newBooking);

    const allBookings = await Bookings.find().toArray();
    const bookedDates = allBookings.map((b) => b.date);

    io.emit("bookingUpdated", bookedDates);

    res.json({ success: true, bookedDates });
  });

  app.get("/api/bookings", async (req, res) => {
    const all = await Bookings.find().toArray();
    res.json(all.map((b) => b.date));
  });

  app.get("/api/quote", (req, res) => {
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

  app.use((req, res) => {
    res.sendFile("index.html", { root: "public" });
  });

  httpServer.listen(port, () => {
    console.log(`Backend service running on port ${port}`);
  });
}

startServer();

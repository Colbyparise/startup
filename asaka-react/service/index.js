import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

let users = [];
let bookings = [];

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ error: "Email already exists" });

  const hashed = bcrypt.hashSync(password, 8);
  const newUser = { id: uuidv4(), name, email, password: hashed };
  users.push(newUser);

  res.json({ success: true, user: { id: newUser.id, name: newUser.name } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: "Invalid credentials" });

  res.cookie("session", user.id, { httpOnly: true });
  res.json({ success: true, user: { id: user.id, name: user.name } });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("session");
  res.json({ success: true });
});

app.post("/api/book", (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) return res.status(400).json({ error: "Missing fields" });

  bookings.push({ id: uuidv4(), name, date });
  const bookedDates = bookings.map(b => b.date);
  res.json({ success: true, bookedDates });
});

app.get("/api/bookings", (req, res) => {
  const bookedDates = bookings.map(b => b.date);
  res.json(bookedDates);
});
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/api/quote", (req, res) => {
  const quotes = [
    "Creativity takes courage.",
    "Photography is the story I fail to put into words.",
    "A picture is a poem without words.",
    "The best camera is the one you have with you.",
    "Art is not what you see, but what you make others see."
  ];

  const random = quotes[Math.floor(Math.random() * quotes.length)];

  res.json({ content: random });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(port, () => console.log(`Backend service running on port ${port}`));

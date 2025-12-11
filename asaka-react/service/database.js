// database.js
import { MongoClient } from "mongodb";
import fs from "fs";

const dbConfig = JSON.parse(fs.readFileSync("dbConfig.json", "utf8"));

const uri = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}/${dbConfig.database}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
});

let Users;
let Bookings;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db(dbConfig.database);
    Users = db.collection("users");
    Bookings = db.collection("bookings");
  } catch (err) {
    console.error("MongoDB connection FAILED");
    console.error(err);
    process.exit(1);
  }
}

// User functions
async function addUser(user) {
  return Users.insertOne(user);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function getUserById(id) {
  return Users.findOne({ id });
}

// Booking functions
async function addBooking(booking) {
  return Bookings.insertOne(booking);
}

async function getAllBookings() {
  return Bookings.find().toArray();
}

export {
  connectDB,
  addUser,
  getUserByEmail,
  getUserById,
  addBooking,
  getAllBookings,
};

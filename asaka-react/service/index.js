const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Serve public folder after deployment
app.use(express.static("public"));

// test endpoint
app.get("/api/hello", (req, res) => {
  res.send({ msg: "Backend is working!" });
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
const JWT_SECRET = "qwerasdf";
mongoose
  .connect("mongodb://localhost:27017/stdsDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model("User", UserSchema);
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid username" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.cookie("token", token, {
    httpOnly: true,
    expiresIn : "10h"
  });

  res.status(200).json({ message: "Login successful" });
});

app.get("/dashboard", (req, res) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ message: "Welcome user" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

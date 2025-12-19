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
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
});
const User = mongoose.model("User", UserSchema);
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const roleEntered = (role || "user").toLowerCase();
  const finalRole = roleEntered === "admin" ? "admin" : "user";

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role: finalRole });
  await user.save();

  res.status(201).json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  const Loginrole = role ? role.toLowerCase() : undefined;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid username" });

  if (Loginrole && user.role !== Loginrole) {
    return res.status(403).json({ message: "Invalid role" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const authToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h"
  });

  res.cookie("token", authToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000
  });

  res.status(200).json({ message: "Login successful", role: user.role, token: authToken });
});

app.get("/dashboard", (req, res) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (decodedToken.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Welcome admin" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.json({ message: "Logged out" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

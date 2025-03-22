const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://movie:movie@cluster0.1j768.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

app.post("/api/users/signup", async (req, res) => {
  const { uid, email } = req.body;

  try {
    const existing = await User.findOne({ uid });
    if (!existing) {
      await User.create({ uid, email });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

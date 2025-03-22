const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

app.post("/api/users/signup", async (req, res) => {
  const { uid, email } = req.body;
  try {
    const existing = await User.findOne({ uid });
    if (!existing) {
      await User.create({ uid, email });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.get("/", (req, res) => {
  res.send("MovieHub API is working!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


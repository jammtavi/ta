import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

// Reuse connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  uid: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await connect();
    const { uid, email } = req.body;
    const existing = await User.findOne({ uid });
    if (!existing) {
      await User.create({ uid, email });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB error' });
  }
}

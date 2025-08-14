require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("Missing MONGO_URI in .env. Copy .env.example to .env and set the connection string.");
  process.exit(1);
}

// Recommended options for Mongoose 8
const options = {
  autoIndex: true
};

let isConnectedOnce = false;

async function connectDB() {
  try {
    await mongoose.connect(uri, options);
    if (!isConnectedOnce) {
      console.log("✅ Connected to MongoDB");
      isConnectedOnce = true;
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("Error during MongoDB disconnect:", err);
  }
}

module.exports = { mongoose, connectDB, disconnectDB };
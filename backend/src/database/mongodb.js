const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn("MONGODB_URI not found. Simulation history will be disabled.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDB,
  isDBConnected,
};

const mongoose = require("mongoose");

const MONGO_URL = process.env.CONN_URL;
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Can not connect to DB", error);
  }
}

module.exports = connectDB;

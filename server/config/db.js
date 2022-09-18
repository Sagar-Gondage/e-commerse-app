const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connnected to ${conn.connection.host}`);
  } catch (err) {
    console.log(`error occured ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;

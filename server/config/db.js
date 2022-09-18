const mongoose = require("mongoose");
const colors = require("colors");

// .green.underline this is just to add some colors to console so that it will be easy to read the line
// same for .red.bold

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `mongodb connnected to ${conn.connection.host}`.green.underline
    );
  } catch (err) {
    console.log(`error occured ${err}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

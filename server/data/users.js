const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    passowrd: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    passowrd: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    passowrd: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;

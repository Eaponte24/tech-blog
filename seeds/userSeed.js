const { User } = require("../models");

const userData = [
  {
    username: "Ali",
    password: "Password123",
  },
  {
    username: "David",
    password: "Yellow20",
  },
  {
    username: "Zack",
    password: "Cowboys123",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

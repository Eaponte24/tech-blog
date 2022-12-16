const seedUsers = require("./userSeed");
const seedPosts = require("./postSeed");
const seedComments = require("./commentSeed");

const sequelize = require("../config/connection");

const seedTechblog_db = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedPosts();
  await seedComments();
  process.exit(0);
};

seedTechblog_db();

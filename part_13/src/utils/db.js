const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "supersecretpassword",
  database: "blogapp",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };

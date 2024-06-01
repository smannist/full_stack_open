const { Sequelize, QueryTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const printBlogs = async () => {
  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL);

    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });

    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

printBlogs();

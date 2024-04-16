const mongoose = require("./db");
const jwt = require("jsonwebtoken");

const {
  saveError,
  userError,
  invalidCredentialsError,
} = require("./errorHandler");

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments({});
    },
    authorCount: async () => {
      return await Author.countDocuments({});
    },
    allBooks: async (_, { genre }) => {
      return await Book.find(genre ? { genres: genre } : {}).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (_, __, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        invalidCredentialsError();
      }

      let authorObj = await Author.findOne({ name: args.author });

      if (!authorObj) {
        try {
          authorObj = new Author({ name: args.author });
          await authorObj.save();
        } catch (error) {
          saveError(error);
        }
      }

      const book = new Book({ ...args, author: authorObj });

      try {
        await book.save();
      } catch (error) {
        saveError(error);
      }

      return book;
    },
    editAuthor: async (_, { name, setBornTo }, context) => {
      if (!context.currentUser) {
        invalidCredentialsError();
      }

      const author = await Author.findOne({ name: name });

      if (!author) {
        return null;
      }

      author.born = setBornTo;

      try {
        await author.save();
      } catch (error) {
        saveError(error);
      }

      return author;
    },
    createUser: async (_, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        userError(error, args);
      });
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        invalidCredentialsError();
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;

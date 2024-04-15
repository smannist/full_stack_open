const { GraphQLError } = require("graphql");
const mongoose = require("./db");

const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.countDocuments({})
    },
    authorCount: async () => {
      return await Author.countDocuments({})
    },
    allBooks: async (_, { genre }) => {
      return await Book
                    .find(genre ? { genres: genre } : {})
                    .populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      let authorObj = await Author.findOne({ name: args.author });

      if (!authorObj) {
        authorObj = new Author({ name: args.author });
        await authorObj.save();
      }

      const book = new Book({ ...args, author: authorObj });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name: name });
  
      if (!author) {
        return null;
      }
  
      author.born = setBornTo;
      await author.save();
      return author;
    },
  },
};


module.exports = resolvers;
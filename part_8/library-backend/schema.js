const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  born: Int
  bookCount: Int!
  id: ID!
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ) : Book
}

type Mutation {
  editAuthor(
    name: String!
    setBornTo: Int!
  ) : Author
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}
`;

module.exports = typeDefs;
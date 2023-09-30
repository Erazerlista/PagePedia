const { gql } = require('apollo-server-express');

//Type defs
const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: StringtitleL String
  }

  type BookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    me: User
  }
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username:String!, email: String!, password: String!): Auth
    saveBook: (input: BookInput! ): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

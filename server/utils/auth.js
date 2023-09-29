const app = express();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs'); // Your GraphQL schema
const resolvers = require('./resolvers'); // Your GraphQL resolvers
const { authMiddleware } = require('./auth'); // Your auth middleware

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Use authMiddleware to handle authentication
});

server.applyMiddleware({ app });

const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for Apollo Server context
  authMiddleware: function ({ req }) {
    // Get the token from the request headers
    const token = req.headers.authorization || '';

    if (!token) {
      throw new Error('You have no token!');
    }

    try {
      // Verify the token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Return user data in the context
      return { user: data };
    } catch (err) {
      console.log('Invalid token:', err.message);
      throw new Error('Invalid token!');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

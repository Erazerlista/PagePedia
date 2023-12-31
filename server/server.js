const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Define your GraphQL schema (typeDefs) and resolvers
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
  },
};

// Create an Express server
const app = express();
const PORT = process.env.PORT || 3007;

// Create an Apollo Server instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply Apollo Server as middleware to Express app
apolloServer.applyMiddleware({ app });

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If you're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

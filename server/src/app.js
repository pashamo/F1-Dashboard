'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { ApolloServer } = require('apollo-server-fastify');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

module.exports = async (fastify, opts) => {
  // Place here your custom code!
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  const start = async () => {
    fastify.register(server.createHandler());
    await fastify.listen(4000);
  };
  start();
}

'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const { ApolloServer } = require('apollo-server-fastify');
const { typeDefs, resolvers } = require('./schema/schema');

module.exports = async function (fastify, opts) {
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
  
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

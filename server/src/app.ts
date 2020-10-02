const fastify = require('fastify');
const { ApolloServer } = require('apollo-server-fastify');
const fs = require('fs');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT: number = 4000;

const init = () => {
  const app = fastify();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  app.register(server.createHandler());
  app.register(require('fastify-cors'));
  
  app.get('/', (request: any, reply: any)  => {
    reply.send(`Welcome to the Apollo GraphQL Server wrapped in Fastify\nplease go to /graphql to play around with the API`);
  });

  return app;
}


if (require.main === module) {
  //This condition allows to run server locally 
  //eg. node src/fastify_app
  init().listen(PORT, (err: any) => {
    if (err) {
      console.error(err);
    }
    console.log(`Listening on port ${PORT}`);
  })

} else {
  //This condition exports the fastify app for lambda purpose
  module.exports = init;
}
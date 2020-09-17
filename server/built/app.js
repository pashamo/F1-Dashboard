'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const AutoLoad = require('fastify-autoload');
const { ApolloServer } = require('apollo-server-fastify');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
module.exports = (fastify, opts) => __awaiter(void 0, void 0, void 0, function* () {
    // Place here your custom code!
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    const start = () => __awaiter(void 0, void 0, void 0, function* () {
        fastify.register(server.createHandler());
        yield fastify.listen(4000);
    });
    start();
});
//# sourceMappingURL=app.js.map
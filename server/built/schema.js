"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_fastify_1 = require("apollo-server-fastify");
module.exports = apollo_server_fastify_1.gql `
  type Driver {
    driver: String!
    f1constructor: String!
    pointsCumulative: [Int!]
  }

  type Comment {
    comment: String!
    id: String!
  }

  type Query {
    f1drivers: [Driver!]
    f1driver(driver: String!): Driver!
    f1comments: [Comment!]
  }

  type Mutation {
    addf1comment(comment: String!): Comment!
    deletef1comment(id:String!): Comment!
  }
`;
//# sourceMappingURL=schema.js.map
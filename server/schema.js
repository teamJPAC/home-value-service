const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers.js');

const typeDefs = `
  type Home {
    id: Int
    address: String
    city: String
    beds: Float
    baths: Float
    sqFt: Float
    status: String
    taxAssessment: Float
  }

  type Query {
    allHouses: [Home]
    getSome(num: [Int]!): [Home]
  }

  input UserInput {
    id: Int
    address: String
    city: String
    beds: Float
    baths: Float
    sqFt: Float
    status: String
    taxAssessment: Float
  }

  type Mutation {
    addHouse(input: UserInput!): Home
    updateHouse(id: Int!, input: UserInput!) : Home
    deleteHouse(id: Int!): Home
  }

`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;

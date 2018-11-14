const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers.js');

const typeDefs = `
  type Home {
    _id: String!
    address: String!
    city: String!
    zestimate: [Int]!
    beds: Int!
    baths: Float!
    sqFt: Int!
    status: String!
    taxAssessment: Float!
  }

  type Query {
    allHouses: [Home]
    getSome(num: [Int]!): [Home]
  }
  
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = schema;

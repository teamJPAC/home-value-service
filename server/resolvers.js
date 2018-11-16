const House = require('./database/House.js');

const resolvers = {
  Query: {
    async allHouses() {
      return await House.find();
    },
    async getSome(dummy, numObj) {
      return await House.find({ id: { $in: numObj.num } });
    },
  },
  Mutation: {
    async addHouse(input) {
      // add data into house
      return await House.create(input);
    },
    async updateHouse() {
      // update data in house
      return await House.findOneAndUpdate({ id: {} });
    },
    async deleteHouse() {
      // delete data in house
    },
  },
};

module.exports = resolvers;

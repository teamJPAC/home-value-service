const House = require('./database/House.js');
const HousePG = require('./postCRUD');

const resolvers = {
  Query: {
    async allHouses() {
      return await House.find();
    },
    async getSome(_, numObj) {
      // return await House.find({ id: { $in: numObj.num } });
      return await HousePG.read(numObj.num);
    },
  },
  Mutation: {
    async addHouse(_, { input }) {
      console.log('INPUT ------>', input);
      // add data into house
      return await House.create(input);
    },
    async updateHouse(_, { input }) {
      // update data in house
      return await House.updateOne({ id: input.id }, input, { multi: false });
    },
    async deleteHouse(_, { id }) {
      console.log(id);
      // delete data in house
      return await House.deleteOne({ id });
    },
  },
};

module.exports = resolvers;

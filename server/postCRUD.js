const { Pool } = require('pg');
const client = require('./postdb.js')
// const connect = 'postgres://postgres:password@localhost:5432/housingdb';
// const db = new Pool({
//   connectionString: connect,
//   max: 20,
// });

const db = new Pool({
  host: client.host,
  port: client.port,
  database: client.database,
  user: client.user,
  password: client.password,
  max: 20,
});

module.exports = {
  create: () => {
    console.log('Create');
  },
  read: async (...houseInfo) => {
    const { rows } = await db.query(
      `SELECT * FROM zillgo WHERE id in (${houseInfo})`,
    );
    console.log('ROWS --->', rows);
    return rows;
  },
  update: () => {
    console.log('Update');
  },
  delete: () => {
    console.log('Delete');
  },
};

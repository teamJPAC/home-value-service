const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'house_info',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const MyModel = models.loadSchema('Home', {
  fields: {
    id: 'int',
    address: 'text',
    city: 'text',
    zip: 'int',
    beds: 'decimal',
    baths: 'decimal',
    sqft: 'int',
    status: 'text',
    taxassessment: 'int',
  },
  key: ['id'],
});

console.log(models.modelInstance.Home === MyModel);

MyModel.syncDB((err, result) => {
  if (err) {
    throw err;
  }
  console.log('schemed was altered', result);
});


// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/seedCSV/csv/pipePost.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test2.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test3.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test4.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test5.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test6.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test7.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test8.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test9.csv' WITH HEADER = FALSE;

// COPY house_info."Home"(id, address, city, zip, beds, baths, sqft, status, taxassessment) FROM '/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/csv/test10.csv' WITH HEADER = FALSE;

// const url = '127.0.0.1: 9042';

// const head_csv = 'head text.csv';

// sbt “\
// run - k house_info - t House - p c1, c2, c3, c4, c5, c6, c7, c8, c9 \
// -c c1 = int, c2 = varchar, c3 = varchar, c4 = int, c5 = double, c6 = double, c7 = double, c8 = varchar, c9 = double \
// -f / Users / macbeth / Documents / Coding / hrr34 / home - value - service / server / database / test.csv \
// -o / Users / macbeth / Documents / Coding / hrr34 / home - value - service / server / database / house_info / House”
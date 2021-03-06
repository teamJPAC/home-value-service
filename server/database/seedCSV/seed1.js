const faker = require('faker');
const csv = require('fast-csv');
const fs = require('fs');

const random = num => Math.ceil(Math.random() * num);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

let count = 0;

const seedFunc = () => {
  const id = count;
  count++;

  return {
    _id: id.toString(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    zip: 98100 + random(99),
    // zestimate,
    beds: 3 + Math.floor(Math.random() * 2.5),
    baths: 2.5 + 0.5 * Math.floor(Math.random() * 3),
    sqFt: 1150 + 10 * random(20),
    status: Math.random() < 0.5 ? 'For Sale' : 'Sold',
    taxAssessment: randomRange(100000, 500000) * 0.937,
  };
};

const sdcSeed = () => {
  console.time('time');
  const csvStream = csv.createWriteStream({ headers: false });
  const writableStream = fs.createWriteStream(__dirname + '/csv/full.csv',{ flags: 'a' });
  // const writableStream = fs.createWriteStream(__dirname + '/csv/full1.csv');

  csvStream.on('finish', () => {
    console.log('DONE!!!');
  });
  csvStream.pipe(writableStream);
  for (let i = 0; i <= 1000000; i++) {
    csvStream.write(seedFunc());
  }
  csvStream.end();
  console.timeEnd('time');
};

sdcSeed();

module.exports = seedFunc;

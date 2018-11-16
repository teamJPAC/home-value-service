const faker = require('faker');
// const mongoose = require('mongoose');
// const House = require('./House.js');
// const db = require('./index.js');
const csv = require('fast-csv');
const fs = require('fs');

const random = num => Math.ceil(Math.random() * num);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

// const zestHistory = () => {
//   let total = 300000;
//   const years = 8 + random(2);
//   const months = random(12);
//   let count = 0;
//   const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
//   const slope = [
//     -4000,
//     -3000,
//     -1000,
//     2000,
//     5000,
//     2000,
//     5000,
//     3000,
//     10000,
//     7000,
//     700,
//     -700,
//   ];
//   let moreSlope = 0;

//   return Array.from({ length: years * 12 + months }, () => {
//     count++;
//     if (count % spike[0] === 0) {
//       const rand = random(4);
//       moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
//       if (spike[0] === 14) {
//         moreSlope = 8000;
//       }
//       spike.shift();
//     }
//     total += slope[Math.floor(count / 12)] + moreSlope;

//     return total + random(7000);
//   });
// };

let count = 1000000;

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
  const writableStream = fs.createWriteStream(__dirname + '/csv/test2.csv');

  csvStream.on('finish', () => {
    console.log('DONE!!!');
  });

  csvStream.pipe(writableStream);
  for (let i = 1000000; i < 2000000; i++) {
    csvStream.write(seedFunc());
  }

  csvStream.end();
  console.timeEnd('time');
};

sdcSeed();

module.exports = seedFunc;

// const seedDatabase = () => {
//   House.create(seed)
//     .then(() => mongoose.connection.close())
//     .catch(err => console.error(err));
// };

// seedDatabase();

const faker = require('faker');
const { Readable } = require('stream');
const fs = require('fs');

const random = num => Math.ceil(Math.random() * num);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

let count = 0;

const seedFunc = () => {
  const id = count;
  count++;
  const currentId = id;
  const address = faker.address.streetAddress();
  const city = faker.address.city();
  const zip = 98100 + random(99);
  // zestimate,
  const beds = 3 + Math.floor(Math.random() * 2.5);
  const baths = 2.5 + 0.5 * Math.floor(Math.random() * 3);
  const sqFt = 1150 + 10 * random(20);
  const status = Math.random() < 0.5 ? 'For Sale' : 'Sold';
  const taxAssessment = randomRange(100000, 500000);

  const result = `${currentId},${address},${city},${zip},${beds},${baths},${sqFt},${status},${taxAssessment}\n`;

  return result;
};

/* POSTGRES === ALL 10 MILLION AT ONCE */
const inStreamPost = new Readable({
  read() {
    this.push(seedFunc());
    if (count === 10000000) {
      this.push(null);
      console.timeEnd('Time');
    }
  },
});

console.time('Time');
const writeableStream = fs.createWriteStream('server/database/seedCSV/csv/pipePost.csv');
inStreamPost.pipe(writeableStream);

const faker = require('faker');
const { Readable } = require('stream');
const fs = require('fs');

const streams = {
  1: fs.createWriteStream('csv/data1.csv'),
  2: fs.createWriteStream('csv/data2.csv'),
  3: fs.createWriteStream('csv/data3.csv'),
  4: fs.createWriteStream('csv/data4.csv'),
  5: fs.createWriteStream('csv/data5.csv'),
  6: fs.createWriteStream('csv/data6.csv'),
  7: fs.createWriteStream('csv/data7.csv'),
  8: fs.createWriteStream('csv/data8.csv'),
  9: fs.createWriteStream('csv/data9.csv'),
  10: fs.createWriteStream('csv/data10.csv'),
};

const random = num => Math.ceil(Math.random() * num);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

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
  const taxAssessment = randomRange(100000, 500000) * 0.937;

  const result = `${currentId},${address},${city},${zip},${beds},${baths},${sqFt},${status},${taxAssessment}\n`;

  return result;
};

let count = 0;
let records = 1000000;
let stream = 1;

const inStream = new Readable({
  read() {
    this.push(seedFunc());
    if (count === 10000000) {
      console.timeEnd('Result Time')
      this.push(null);
    }
    if (count === records) {
      records += 1000000;
      this.pause();
      this.unpipe(streams[stream]);
      stream++;
      this.pipe(streams[stream]);
      this.resume();
    }
  },
});

console.time('Result Time')
inStream.pipe(streams[stream]);
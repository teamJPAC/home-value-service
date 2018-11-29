import http from 'k6/http';

const ip = require('./ip.js');

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 0 },
  ],
};

const random = num => Math.floor(Math.random() * (num - 9000000 + 1)) + 9000000;

const num = random(10000000);

const url = `http://${ip}:7777/${num}`;

export default function () {
  http.post(url);
}

/**
{
  getSome(num: 9999999){
    id
    address
    city
    beds
    baths
    sqFt
    status
    taxAssessment
  }
}
 */

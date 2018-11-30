import http from 'k6/http';
import { check, sleep } from 'k6';

const ip = require('./ip.js');

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 0 },
  ],
};

const random = num => Math.floor(Math.random() * (num - 9000000 + 1)) + 9000000;

const num = random(10000000);

const url = `http://${ip}:7777/${num}`;

const dataUrl = `http://${ip}:7777/graphql/0?query=%23%20Welcome%20to%20GraphiQL%0A%23%0A%23%20GraphiQL%20is%20an%20in-browser%20tool%20for%20writing%2C%20validating%2C%20and%0A%23%20testing%20GraphQL%20queries.%0A%23%0A%23%20Type%20queries%20into%20this%20side%20of%20the%20screen%2C%20and%20you%20will%20see%20intelligent%0A%23%20typeaheads%20aware%20of%20the%20current%20GraphQL%20type%20schema%20and%20live%20syntax%20and%0A%23%20validation%20errors%20highlighted%20within%20the%20text.%0A%23%0A%23%20GraphQL%20queries%20typically%20start%20with%20a%20%22%7B%22%20character.%20Lines%20that%20starts%0A%23%20with%20a%20%23%20are%20ignored.%0A%23%0A%23%20An%20example%20GraphQL%20query%20might%20look%20like%3A%0A%23%0A%23%20%20%20%20%20%7B%0A%23%20%20%20%20%20%20%20field(arg%3A%20%22value%22)%20%7B%0A%23%20%20%20%20%20%20%20%20%20subField%0A%23%20%20%20%20%20%20%20%7D%0A%23%20%20%20%20%20%7D%0A%23%0A%23%20Keyboard%20shortcuts%3A%0A%23%0A%23%20%20Prettify%20Query%3A%20%20Shift-Ctrl-P%20(or%20press%20the%20prettify%20button%20above)%0A%23%0A%23%20%20%20%20%20%20%20Run%20Query%3A%20%20Ctrl-Enter%20(or%20press%20the%20play%20button%20above)%0A%23%0A%23%20%20%20Auto%20Complete%3A%20%20Ctrl-Space%20(or%20just%20start%20typing)%0A%23%0A%0A%7B%0A%20%20getSome(num%3A%20${num})%7B%0A%20%20%20%20id%0A%20%20%20%20address%0A%20%20%20%20city%0A%20%20%20%20beds%0A%20%20%20%20baths%0A%20%20%20%20sqft%0A%20%20%20%20status%0A%20%20%20%20taxassessment%0A%20%20%7D%0A%7D`;

export default function () {
  const res = http.post(dataUrl);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(0);
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

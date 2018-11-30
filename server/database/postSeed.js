const { Client } = require('pg');

const connect = 'postgres://postgres:password@localhost:5432/housingdb';
const db = new Client(connect);

db.connect();

const sdc = `create table if not exists zillgo (

id int,
address varchar(84),
city varchar(28),
zip int,
beds decimal,
baths decimal,
sqFt int,
status varchar(10),
taxAssessment int
)`;

db.query(sdc)
  .then((res) => {
    console.log(res);
    db.end();
  })
  .catch((err) => {
    console.log(err);
    db.end();
  });

const csvSeed = 'copy zillgo from \'/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/seedCSV/csv/pipePost.csv\' with (format csv)';

db.query(csvSeed)
  .then((res) => {
    console.log(res);
    db.end();
  })
  .catch((err) => {
    console.log(err);
    db.end();
  });

module.exports = db;

// create index num on zillgo (id); - add index ontop of existing id

// scp -r -i home_value_comp.pem pipePost.csv ec2-user@ec2-54-242-102-202.compute-1.amazonaws.com:~

// copy zillgo from '~\pipePost.csv' with (format csv)

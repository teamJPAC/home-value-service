const pg = require('pg');

const connect = 'postgres://postgres:password@localhost:5432/housingdb';
const db = new pg.Client(connect);

db.connect();

const sdc = `create table if not exists zillgo (

_id int,
address varchar(84),
city varchar(28),
zip int,
beds decimal,
baths decimal,
sqFt decimal,
status varchar(10),
taxAssessment decimal
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

const csvSeed = 'copy zillgo from \'/Users/macbeth/Documents/Coding/hrr34/home-value-service/server/database/test.csv\' with (format csv)';

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

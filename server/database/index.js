const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin1:admin1password@cluster0-ytvdt.mongodb.net/houses?retryWrites=true/';

const db = mongoose.connect(
  uri,
  { useNewUrlParser: true },
);

module.exports = db;

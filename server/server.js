// require('newrelic');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const schema = require('./schema.js');

// const url = 'mongodb://localhost/houses';
const url = 'postgres://localhost/housingdb';

const port = 5000;
const port1 = 5001;
const port2 = 5002;
const port3 = 5003;

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(
//   url,
//   { useNewUrlParser: true },
// );

app.use(cors());

app.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(`${__dirname}/../public`));

app.get('/:urlId', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

app.post('/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  }));


app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

// disable x-powered-by
app.disable('x-powered-by');

// app.listen(port0, () => console.log(
//   `Express GraphQL Server Now Running On localhost:${port0}/graphql`,
// ));

/** DOCKER STUFF */
module.exports = app;

/** NGINX EXPERIMENTS */

app.listen(port, () => console.log(
  `Express GraphQL Server Now Running On localhost:${port}/graphql`,
));

// app.listen(port2, () => console.log(
//   `Express GraphQL Server Now Running On localhost:${port2}/graphql`,
// ));

// app.listen(port3, () => console.log(
//   `Express GraphQL Server Now Running On localhost:${port3}/graphql`,
// ));
